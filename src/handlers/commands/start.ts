import type { NewMessageEvent } from "telegram/events/NewMessage";
import { I18nEngine } from "../../utils/localization/processor";

export async function StartCommand(event: NewMessageEvent) {
  await event.message.reply(
    { message: I18nEngine.Get("START") }
  )
}