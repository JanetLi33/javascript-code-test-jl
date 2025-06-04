import { Book, BookSearch } from "../types";

export interface BookApiAdapter {
    searchBooks(searchParams: BookSearch): Promise<Book[]>;
}