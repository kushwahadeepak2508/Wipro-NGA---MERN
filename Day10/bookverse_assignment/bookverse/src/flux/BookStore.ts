// src/flux/BookStore.ts
import Dispatcher from "./Dispatcher";
import { ActionTypes, AddBookPayload } from "./actions";

type Listener = () => void;

export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  description?: string;
};

export class BookStore {
  private books: Book[] = [];
  private listeners: Set<Listener> = new Set();
  private dispatchToken?: number;

  constructor(initialBooks: Book[] = [], private dispatcher = Dispatcher) {
    this.books = [...initialBooks];
    // register with dispatcher
    this.dispatchToken = this.dispatcher.register((payload: any) => this.__onDispatch(payload));
  }

  getAll() {
    return [...this.books];
  }

  addBook(book: Book) {
    this.books = [...this.books, book];
    this.emitChange();
  }

  private __onDispatch(payload: any) {
    if (payload?.type === ActionTypes.ADD_BOOK) {
      const p = payload as AddBookPayload;
      this.addBook(p.book);
    }
  }

  emitChange() {
    for (const l of this.listeners) l();
  }

  addChangeListener(cb: Listener) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  removeChangeListener(cb: Listener) {
    this.listeners.delete(cb);
  }

  // teardown if needed
  dispose() {
    if (this.dispatchToken) {
      this.dispatcher.unregister(this.dispatchToken);
    }
    this.listeners.clear();
  }
}

// default store instance (you may inject an alternative in tests)
export const defaultBooks: Book[] = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 9.99 },
  { id: 2, title: "1984", author: "George Orwell", price: 8.5 },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 10.0 },
  { id: 4, title: "The Hobbit", author: "J.R.R. Tolkien", price: 12.5 },
];

export const defaultBookStore = new BookStore(defaultBooks);
export default BookStore;
