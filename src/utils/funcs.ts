export class Functions {
    public static Timestamp(): number {
        return Math.floor(+new Date() / 1000);
    }

    public static FromUnixToDate(timestamp: number): string {
        let date = new Date(timestamp * 1000);
        return date.toLocaleDateString("ru-RU") + " " + date.toLocaleTimeString("ru-RU") + " (GMT+0)";
    }
}