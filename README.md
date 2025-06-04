# Book Search API Client

A TypeScript client for searching books by author, publisher, or year, with support for multiple book data APIs. Refactored from a previous BookSearchApiClient class for improved modularity and extensibility. 

## Implementation  

- Pluggable API backends via a clean abstraction layer
- Strong static typing across the project
- Input validation for query parameters and limit values
- Comprehensive unit and integration test coverage
- Centralized API config and routes
- Flexibility to extend for new query types or providers

## Getting Started

```bash
npm install
npm run build
npm test
