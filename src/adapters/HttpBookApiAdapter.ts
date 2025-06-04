import { BookApiAdapter } from "./BookApiAdapter";
import { Book, BookSearch } from "../types";
import type { AxiosInstance } from "axios";
import { EXAMPLE_BOOK_API_ROUTES } from "../constants/apiRoutes";


export class HttpBookApiAdapter implements BookApiAdapter {
  constructor(private readonly httpClient: AxiosInstance) {}

  async searchBooks(params: BookSearch): Promise<Book[]> {
    const { type, value, limit } = params;

    const endpoint = this.getPathForQueryType(type);
    const queryParams: Record<string, string | number> = { q: value };
    if (limit !== undefined) {
      queryParams.limit = limit;
    }

    try {
      const response = await this.httpClient.get(endpoint, {
        params: queryParams,
      });

      return (response.data as any[]).map((item) => ({
        title: item?.book?.title ?? "Unknown",
        author: item?.book?.author ?? "Unknown",
        isbn: item?.book?.isbn,
        quantity: item?.stock?.quantity,
        price: item?.stock?.price,
      }));

    } catch (error) {
      throw new Error(`Failed to fetch books: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private getPathForQueryType(type: BookSearch["type"]): string {
    const path = EXAMPLE_BOOK_API_ROUTES[type];
    if (!path) {
      throw new Error(`Unsupported query type: ${type}`);
    }
    return path;
  }
}