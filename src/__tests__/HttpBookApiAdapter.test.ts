import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { HttpBookApiAdapter } from "../adapters/HttpBookApiAdapter";
import { BookSearch } from "../types";
import { EXAMPLE_BOOK_API_ROUTES } from "../constants/apiRoutes";

describe("HttpBookApiAdapter", ()=> {
    const httpClient = axios.create();
    const mock = new MockAdapter(httpClient);
    const adapter = new HttpBookApiAdapter(httpClient);

    afterEach(() => {
        mock.reset();
    });

    it("searches books by author", async () => {
        mock.onGet(EXAMPLE_BOOK_API_ROUTES.author, { params: { q: "Dickens", limit: 1 } }).reply(200, [
        {
            book: { title: "1850", author: "Charles Dickens", isbn: "123" },
            stock: { quantity: 10, price: 15.5 }
        }
        ]);

        const result = await adapter.searchBooks({ type: "author", value: "Dickens", limit: 1 });

        expect(result).toEqual([
        {
            title: "1850",
            author: "Charles Dickens",
            isbn: "123",
            quantity: 10,
            price: 15.5,
        }]);
    });

   it("handles undefined optional fields without error", async () => {
        mock.onGet(EXAMPLE_BOOK_API_ROUTES.author, { params: { q: "The Book Title" } }).reply(200, [{ book: {}, stock: {} }]);

        const result = await adapter.searchBooks({ type: "author", value: "The Book Title" });

        expect(result).toEqual([
          {
            title: "Unknown",
            author: "Unknown",
            isbn: undefined,
            quantity: undefined,
            price: undefined,
          },
        ]);
    });

    it("returns empty array when API returns no books are found", async () => {
        mock.onGet(EXAMPLE_BOOK_API_ROUTES.author).reply(200, []);

        const result = await adapter.searchBooks({ type: "author", value: "Nobody" });

        expect(result).toEqual([]);
    });

    it("throws error for unsupported query type", async () => {
        const invalidQuery = { type: "invalid", value: "Medical" } as unknown as BookSearch;

        await expect(adapter.searchBooks(invalidQuery)).rejects.toThrow("Unsupported query type: invalid");
    });

    it("throws error when API call fails due to network error", async () => {
        mock.onGet(EXAMPLE_BOOK_API_ROUTES.author).networkError();

        await expect(adapter.searchBooks({ type: "author", value: "Orwell" }))
        .rejects.toThrow("Failed to fetch books");
    });

});
