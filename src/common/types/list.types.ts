export type ListParams<T = string> = {
  cursor?: T;
  limit?: number;
};

export type ListResponse<T, R = string | null> = {
  items: T[];
  nextCursor: R;
};
