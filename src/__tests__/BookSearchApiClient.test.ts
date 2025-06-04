import { BookSearchApiClient } from "../client/BookSearchApiClient";
import { BookApiAdapter } from "../adapters/BookApiAdapter";
import { Book } from "../types";

const mockBooks: Book[] = [
  { title: "Test Book", author: "Test Author", isbn: "123456", price: 10, quantity: 5 }
];

const mockAdapter: BookApiAdapter = {
  searchBooks: jest.fn().mockResolvedValue(mockBooks)
};

describe("BookSearchApiClient", () => {
  const client = new BookSearchApiClient(mockAdapter);

  it("searches books by author with default limit", async () => {
    const books = await client.getBooksByAuthor("Test Author");

    expect(mockAdapter.searchBooks).toHaveBeenCalledWith({
      type: "author",
      value: "Test Author",
      limit: 10
    });
    expect(books).toEqual(mockBooks);
  });

  it("searches books by author", async () => {
    const books = await client.getBooksByAuthor("Test Author", 3);

    expect(mockAdapter.searchBooks).toHaveBeenCalledWith({
      type: "author",
      value: "Test Author",
      limit: 3
    });
    expect(books).toEqual(mockBooks);
  });

  it("throws error for empty author", async () => {
    await expect(client.getBooksByAuthor("")).rejects.toThrow("This field is required");
  });

  it("throws error for negative limit", async () => {
    await expect(client.getBooksByAuthor("Hugo", -1)).rejects.toThrow();
  });

  it("searches books by publisher", async () => {
    const books = await client.getBooksByPublisher("Bloomsbury", 5);

    expect(mockAdapter.searchBooks).toHaveBeenCalledWith({
      type: "publisher",
      value: "Bloomsbury",
      limit: 5
    });
    expect(books).toEqual(mockBooks);
  });

  it("throws error for empty publisher", async () => {
    await expect(client.getBooksByPublisher("")).rejects.toThrow("This field is required");
  });

  it("searches books by year", async () => {
    const books = await client.getBooksByYear("2005", 2);

    expect(mockAdapter.searchBooks).toHaveBeenCalledWith({
      type: "year",
      value: "2005",
      limit: 2
    });
    expect(books).toEqual(mockBooks);
  });

  it("throws error for invalid year format", async () => {
    await expect(client.getBooksByYear("1A2B")).rejects.toThrow("Invalid year format. Use YYYY (e.g. 2015)");
  });
});
