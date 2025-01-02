/* Import things */
import type { NewMessageEvent } from "telegram/events/NewMessage";
import type { Api } from "telegram/tl";

/* Import commands */
import { StartCommand } from "./commands/start";
import { BanCommand } from "./commands/ban";
import { UnbanCommand } from "./commands/unban";
import { PingCommand } from "./commands/ping";
import { WhoIsCommand } from "./commands/whois";

/* Import events */
import { ProcessAdminMessage } from "./events/pam";
import { ProcessPrivateMessage } from "./events/ppm";
import Config from "../utils/config";

/* Message processor */
export async function CommandProcessor(event: NewMessageEvent) {
  if (!event.chatId || !event.client)
    return;

  const message = event.message as Api.Message;
  const text = message.text;
  const command = text.split(" ", 1)[0]
  const args = text.substring(command.length + 1)

  if (["/ban", "/unban", "/whois"].includes(command) && Config.TELEGRAM_ADMIN_CHAT != Number(event.chatId)) {
    ProcessPrivateMessage(event);
    return;
  }

  switch (command) {
    case "/start":
      return StartCommand(event);
    case "/ping":
      return PingCommand(event);
    case "/ban":
      return BanCommand(event, args);
    case "/unban":
      return UnbanCommand(event);
    case "/whois":
      return WhoIsCommand(event);
    default:
      if (Number(event.chatId) == Config.TELEGRAM_ADMIN_CHAT)
        ProcessAdminMessage(event);
      else if (event.isPrivate)
        ProcessPrivateMessage(event);
      break;
  }
}
