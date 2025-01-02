import type { NewMessageEvent } from "telegram/events/NewMessage";

import sql from "../../utils/database";
import { Functions } from "../../utils/funcs";
import type { Messages } from "../../utils/types/database/messages";

export async function ProcessAdminMessage(event: NewMessageEvent) {
  const replyMessage = await event.message.getReplyMessage()
  if (!replyMessage) return;

  const allMessages = await sql<Messages[]>`SELECT * FROM Messages WHERE message_id = ${replyMessage.id}`;

  allMessages.forEach(async (element) => {
    console.log(element.internal_message_id)
    if (element.message_id == replyMessage.id)
      await event.client?.sendMessage(
        element.user_id, {
        message: event.message,
        //replyTo: element.internal_message_id
      })
  });
}