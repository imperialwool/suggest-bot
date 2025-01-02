import type { NewMessageEvent } from "telegram/events/NewMessage";

import util from 'util';
import sql from "../../utils/database";
import Config from "../../utils/config";
import { Functions } from "../../utils/funcs";
import { I18nEngine } from "../../utils/localization/processor";

import type { BannedUsers } from "../../utils/types/database/bannedUsers";

export async function ProcessPrivateMessage(event: NewMessageEvent) {
  const userId = Number(event.message.senderId);
  const bannedUsers = await sql<BannedUsers[]>`SELECT * FROM BannedUsers WHERE uid = ${userId}`;
  if (bannedUsers.length > 0) {
    let info = bannedUsers[0];
    await event.message.reply({
      message: util.format(
        I18nEngine.Get("YOU_ARE_BANNED"),
        Functions.FromUnixToDate(info.timestamp), info.reason
      )
    })
    return;
  }

  const result = await event.message.forwardTo(Config.TELEGRAM_ADMIN_CHAT);
  if (result) {
    // @ts-ignore | if message forwarded, api will always return full message
    const messageId = result[0][0].id;
    const internalMessageId = event.message.id;
    await sql`INSERT INTO Messages VALUES (${messageId}, ${internalMessageId}, ${userId}, ${Functions.Timestamp()})`;
  }
  else {
    await event.message.reply({
      message: I18nEngine.Get("ERROR")
    })
  }
}