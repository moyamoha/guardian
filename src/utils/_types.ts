export type User = {
  email: string;
  firstname: string;
  lastname: string;
};

export type Pagination = {
  page: number;
  perPage: number;
};

export type SearchFilter = {
  search: string;
  category: string;
  status: PossibleEntryStatus | "";
};

// Entities
export type EntityIdentifier = {
  _id: string;
  __v: number;
};

export type IdentifierWithOwner = EntityIdentifier & {
  owner: string;
};

export type PossibleEntryStatus = "active" | "expired";

export type Entry = IdentifierWithOwner & {
  title: string;
  username: string;
  url: string | undefined;
  status: PossibleEntryStatus;
  category: {
    _id: string;
    name: string;
  };
};

export type Category = IdentifierWithOwner & {
  name: string;
  entryCount: number;
};
