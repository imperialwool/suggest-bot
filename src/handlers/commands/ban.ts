import type { NewMessageEvent } from "telegram/events/NewMessage";
import { I18nEngine } from "../../utils/localization/processor";
import sql from "../../utils/database";
import { Functions } from "../../utils/funcs";
import type { Messages } from "../../utils/types/database/messages";

export async function BanCommand(
  event: NewMessageEvent,
  args: string = "Блокировка выдана за большое количество типичных нарушений при использовании бота."
) {
  const replyMessage = await event.message.getReplyMessage()
  if (!replyMessage) {
    await event.message.reply({
      message: I18nEngine.Get("ADMIN_COMMAND_NODATA")
    });
    return;
  }

  const messages = await sql<Messages[]>`SELECT * FROM Messages WHERE message_id = ${replyMessage.id}`;
  if (messages.length > 0) {
    const info = messages[0];
    const senderId = Number(info.user_id);
    await sql`
      INSERT INTO BannedUsers
      VALUES (${senderId}, ${args}, ${Functions.Timestamp()})
      ON CONFLICT (uid)
      DO UPDATE SET reason = ${args};
    `

    await event.message.reply(
      { message: I18nEngine.Get("BANNED") }
    )
    return;
  }
  else {
    await event.message.reply({
      message: I18nEngine.Get("ADMIN_COMMAND_NODATA")
    });
    return;
  }
}