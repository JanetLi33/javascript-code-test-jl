import { QueryType } from "../constants/queryTypes";

export interface Book {
    title: string;
    author: string;
    isbn?: string;
    price?: number;
    quantity?: number;
}

export interface BookSearch {
    type: QueryType;
    value: string;
    limit?: number;
}
