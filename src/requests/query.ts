import qs from "query-string";
export const parseQuery = <T extends unknown>(
  query: string
): Record<keyof T, string> => {
  return qs.parse(query) as Record<keyof T, string>;
};
