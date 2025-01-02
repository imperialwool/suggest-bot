export default class Config {
    static readonly TELEGRAM_API_ID: number = parseInt(process.env.TELEGRAM_API_ID!);
    static readonly TELEGRAM_API_HASH: string = process.env.TELEGRAM_API_HASH!;
    static readonly TELEGRAM_BOT_TOKEN: string = process.env.TELEGRAM_BOT_TOKEN!;
    static readonly TELEGRAM_STRING_SESSION: string = process.env.TELEGRAM_STRING_SESSION!;
    
    static readonly TELEGRAM_ADMIN_CHAT: number = parseInt(process.env.TELEGRAM_ADMIN_CHAT!);
    static readonly POSTGRESQL_CONNECTION_URI: string = process.env.DATABASE_URL!;
}