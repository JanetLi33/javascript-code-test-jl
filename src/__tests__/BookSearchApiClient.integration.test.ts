import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BookSearchApiClient } from "../BookSearchApiClient";
import { HttpBookApiAdapter } from "../adapters/HttpBookApiAdapter";
import { Book } from "../types";
import { EXAMPLE_BOOK_API_ROUTES } from "../constants/apiRoutes";

describe("BookSearchApiClient Integration Test", () => {
  const httpClient = axios.create();
  const mock = new MockAdapter(httpClient);
  const adapter = new HttpBookApiAdapter(httpClient);
  const client = new BookSearchApiClient(adapter);

  const mockBooks: Book[] = [
    {
      title: "Test Title",
      author: "Test Author",
      isbn: "123456",
      quantity: 2,
      price: 19.99,
    },
  ];

  const mockBooksApiResponse = [
    {
      book: {
        title: "Test Title",
        author: "Test Author",
        isbn: "123456",
      },
      stock: {
        quantity: 2,
        price: 19.99,
      },
    },
  ];

  afterEach(() => mock.reset());

  it("returns books by author successfully", async () => {
    mock.onGet(EXAMPLE_BOOK_API_ROUTES.author, {
      params: { q: "Test Author", limit: 1 },
    }).reply(200, mockBooksApiResponse);

    const result = await client.getBooksByAuthor("Test Author", 1);

    expect(result).toEqual(mockBooks);
  });

  it("returns books by publisher successfully", async () => {
    mock.onGet(EXAMPLE_BOOK_API_ROUTES.publisher, {
      params: { q: "Test Publisher", limit: 1 },
    }).reply(200, mockBooksApiResponse);

    const result = await client.getBooksByPublisher("Test Publisher", 1);

    expect(result).toEqual(mockBooks);
  });

  it("returns books by year successfully", async () => {
    mock.onGet(EXAMPLE_BOOK_API_ROUTES.year, {
        params: { q: "2021", limit: 1 },
    }).reply(200, mockBooksApiResponse);

    const books = await client.getBooksByYear("2021", 1);

    expect(books).toEqual(mockBooks);
  });

  it("throws error when server responds with 500", async () => {
    mock.onGet(EXAMPLE_BOOK_API_ROUTES.author, {
        params: { q: "Test Author", limit: 1 },
    }).reply(500);

    await expect(client.getBooksByAuthor("Test Author", 5)).rejects.toThrow("Failed to fetch books");
  });
});
