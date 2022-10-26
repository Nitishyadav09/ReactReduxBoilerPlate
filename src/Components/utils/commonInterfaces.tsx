export type fetched = "TRUE" | "FALSE" | "ERROR" | "FETCHING";

export type ID = React.ReactText;

export type ObjectType<T = any> = { [x: string]: T; };
