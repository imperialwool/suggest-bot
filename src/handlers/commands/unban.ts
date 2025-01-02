import type { NewMessageEvent } from "telegram/events/NewMessage";
import { I18nEngine } from "../../utils/localization/processor";
import sql from "../../utils/database";
import type { Messages } from "../../utils/types/database/messages";

export async function UnbanCommand(event: NewMessageEvent) {
  const replyMessage = await event.message.getReplyMessage()
  if (!replyMessage) {
    await event.message.reply({
      message: I18nEngine.Get("ADMIN_COMMAND_NODATA")
    });
    return;
  }

  const messages = await sql<Messages[]>`SELECT * FROM Messages WHERE message_id = ${replyMessage.id}`;
  if (messages.length > 0) {
    let info = messages[0];
    const senderId = Number(info.user_id);
    await sql`
      DELETE FROM BannedUsers
      WHERE uid = ${senderId};
    `

    await event.message.reply(
      { message: I18nEngine.Get("UNBANNED") }
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