import axios from "axios";
import { HttpBookApiAdapter } from "./adapters/HttpBookApiAdapter";
import { BookSearchApiClient } from "./BookSearchApiClient";

async function main(): Promise<void> {
    const httpClient = axios.create({
        baseURL: "https://api.example.com",
        timeout: 5000,
        headers: {
            "Content-Type": "application/json"
        }
    });

    const adapter = new HttpBookApiAdapter(httpClient);
    const client = new BookSearchApiClient(adapter);

    const books = await client.getBooksByAuthor("Author A", 5);
    console.log("Books found:", books);
}

main().catch((err) => {
    console.error("Fatal error occurred:", err);
    process.exit(1);
});