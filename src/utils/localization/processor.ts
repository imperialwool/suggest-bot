import Locale from './locale.json';

export class I18nEngine {
  public static Get(key: string): string {
    // @ts-ignore | since its "any"
    return Locale[key.toUpperCase()] || "⚠️ No replic available. Please contact with developer.";
  }
}