import { BookApiAdapter } from "../adapters/BookApiAdapter";
import { Book } from "../types";
import { QUERY_TYPES } from "../constants/queryTypes";
import { nonEmptyStringValidator, yearValidator, limitNumberValidator } from "../utils/validators";


export class BookSearchApiClient {
    private readonly adapter: BookApiAdapter;
    constructor(adapter: BookApiAdapter){
        this.adapter = adapter;
    }

    async getBooksByAuthor(author: string, limit = 10): Promise<Book[]>{
        nonEmptyStringValidator.parse(author);
        limitNumberValidator.parse(limit);

        return this.adapter.searchBooks({ type: QUERY_TYPES.AUTHOR, value: author, limit });
    }

    async getBooksByPublisher(publisher: string, limit = 10): Promise<Book[]>{
        nonEmptyStringValidator.parse(publisher);
        limitNumberValidator.parse(limit);

        return this.adapter.searchBooks({ type: QUERY_TYPES.PUBLISHER, value: publisher, limit });
    }

    async getBooksByYear(year: string, limit = 10): Promise<Book[]>{
        yearValidator.parse(year);
        limitNumberValidator.parse(limit);
        
        return this.adapter.searchBooks({ type: QUERY_TYPES.YEAR, value: year, limit});
    }
}