import util from 'util';
import sql from "../../utils/database";
import { Api } from "telegram";
import { I18nEngine } from "../../utils/localization/processor";
import type { Messages } from "../../utils/types/database/messages";
import type { NewMessageEvent } from "telegram/events/NewMessage";

export async function WhoIsCommand(
  event: NewMessageEvent
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

    const result = await event.client?.invoke(
      new Api.users.GetFullUser({ id: senderId })
    );

    if (result) {
      const userInfo = result.users[0];
      const fullUserInfo = result.fullUser;
      const blank = I18nEngine.Get("BLANK");

      await event.message.reply(
        {
          message: util.format(
            I18nEngine.Get("USER_INFO"),
            senderId,
            // @ts-ignore | userInfo is Api.Users
            userInfo.username || blank, 
            // @ts-ignore | userInfo is Api.Users
            (userInfo.firstName + (userInfo.lastName || "")) || blank,
            fullUserInfo.about || blank,
            fullUserInfo.businessWorkHours?.timezoneId || blank,
            senderId, senderId
          )
        }
      )
      return;
    }
    else {
      await event.message.reply({
        message: I18nEngine.Get("ERROR")
      });
    }
  }
  else {
    await event.message.reply({
      message: I18nEngine.Get("ADMIN_COMMAND_NODATA")
    });
    return;
  }
}