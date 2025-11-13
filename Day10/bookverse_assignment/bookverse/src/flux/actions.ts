// src/flux/actions.ts
export const ActionTypes = {
  ADD_BOOK: "ADD_BOOK",
} as const;

export type AddBookPayload = {
  type: typeof ActionTypes.ADD_BOOK;
  book: {
    id: number;
    title: string;
    author: string;
    price: number;
    description?: string;
  };
};

// create action helpers
export const addBookAction = (book: AddBookPayload["book"]): AddBookPayload => ({
  type: ActionTypes.ADD_BOOK,
  book,
});
