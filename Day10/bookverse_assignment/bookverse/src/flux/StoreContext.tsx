// src/flux/StoreContext.tsx
import React from "react";
import { BookStore, defaultBookStore } from "./BookStore";

export const StoreContext = React.createContext<BookStore>(defaultBookStore);

type Props = { children: React.ReactNode; store?: BookStore };

export const StoreProvider: React.FC<Props> = ({ children, store = defaultBookStore }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
