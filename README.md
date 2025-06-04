# Book Search API Client

A TypeScript client for searching books by author, publisher, or year, with support for multiple book data APIs. Refactored from a previous BookSearchApiClient class (see: https://github.com/edfenergy-stevebowerman/javascript-code-test/) for improved modularity and extensibility. 

## Implementation  

- Pluggable API backends via a clean abstraction layer
- Strong static typing across the project
- Input validation for query parameters and limit values
- Comprehensive unit and integration test coverage
- Centralized API config and routes
- Flexibility to extend for new query types or providers

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Compile TypeScript to JavaScript
npm run build

# 3. Run unit tests with coverage report
npm test
