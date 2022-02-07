import nano from "nano";

export interface BookInterface extends nano.MaybeDocument {
   title: string;
   authors: Record<string, string>[];
}
