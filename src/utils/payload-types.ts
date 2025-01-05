import type { PossibleEntryStatus } from "./_types";

// Entry
export type CreateEntryPayload = {
  title: string;
  username: string;
  password: string;
  url: string;
  status: PossibleEntryStatus;
};

export type ChangeCategoryForEntryPayload = {
  oldCategoryId: string;
  newCategoryId: string;
};

export type EditEntryPayload = Omit<CreateEntryPayload, "password">;
