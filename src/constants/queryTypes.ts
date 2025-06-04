export const QUERY_TYPES = {
    AUTHOR: "author",
    PUBLISHER: "publisher",
    YEAR: "year",
} as const;

export type QueryType = typeof QUERY_TYPES[keyof typeof QUERY_TYPES];

