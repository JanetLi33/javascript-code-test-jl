import dotenv from "dotenv";
dotenv.config();
import { createHttpClient } from "./config/httpClientFactory";
import { HttpBookApiAdapter } from "./adapters/HttpBookApiAdapter";
import { BookSearchApiClient } from "./client/BookSearchApiClient";


async function main(): Promise<void> {
    const httpClient = createHttpClient();
    const adapter = new HttpBookApiAdapter(httpClient);
    const client = new BookSearchApiClient(adapter);

     try {
       const books = await client.getBooksByAuthor("Author A", 5);

       if (!books?.length) {
         console.log("No books found for the specified author.");
       } else {
         console.log("Books found:", books);
       }
     } catch (err) {
       console.error("Failed to fetch books from the API.", err);
     }
}

main().catch((err) => {
    console.error("Fatal error occurred:", err);
    process.exit(1);
});