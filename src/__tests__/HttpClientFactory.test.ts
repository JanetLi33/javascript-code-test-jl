import { createHttpClient } from "../config/httpClientFactory";

describe("createHttpClient", () => {
  it("creates an axios instance successfully", () => {
    const client = createHttpClient();
    expect(client).toHaveProperty("get");
    expect(client.defaults.baseURL).toBeDefined();
  });
});