export type PagedApiResponse<T> = {
  Search: Array<T>;
  Response: "True" | "False";
  totalResults: string;
};

// totally unnecessary, but in case api response would change so i don't need to change it everywhere
export type ApiResponse<T> = T;
