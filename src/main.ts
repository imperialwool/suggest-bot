/* On exception */
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

/* Import NPM packages */
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";

/* Import utils */
import Config from "./utils/config";
import { CommandProcessor } from "./handlers/processor";

/* Global variables */
const client = new TelegramClient(
  new StringSession(Config.TELEGRAM_STRING_SESSION),
  Config.TELEGRAM_API_ID,
  Config.TELEGRAM_API_HASH,
  {}
);

/* Linking proccessor to client */
client.addEventHandler(CommandProcessor, new NewMessage({}));

/* Starting bot!!! */
(async () => {
  await client.start({
    botAuthToken: Config.TELEGRAM_BOT_TOKEN,
    onError: (err: any) => console.log(err)
  });
  if (!Config.TELEGRAM_STRING_SESSION) {
    console.warn("\x1b[33m[WARN] [SUGGEST_BOT] There is no TELEGRAM_STRING_SESSION! That's not good! No string session = being rate limited if you will restart container bunch of times!");
    console.warn("\x1b[33m[WARN] [SUGGEST_BOT] Please save string below to secrets! Please DO NOT use it in env!");
    console.warn(client.session.save());
  }
})();
