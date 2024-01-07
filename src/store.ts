import { create } from "zustand";

export type Book = {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
  number_of_pages_median: number;
  status: "done" | "inProgress" | "backlog";
};

interface BookState {
  books: Book[];
}

interface BookStore extends BookState {
  addBook: (newBook: Book) => void;
  removeBook: (bookToRemove: Book) => void;
  moveBook: (bookToMove: Book, newStatus: Book["status"]) => void;
  loadBooksFromLocalStorage: () => void;
  //   reorderBooks: (
  //     listType: Book["status"],
  //     startIndex: number,
  //     endIndex: number
  //   ) => void;
}

export const useStore = create<BookStore>((set) => ({
  books: [],
  addBook: (newBook) => {
    set((state: any) => {
      const updatedBooks = [...state.books, { ...newBook, status: "backlog" }];
      localStorage.setItem("readingList", JSON.stringify(updatedBooks));
      return { books: updatedBooks };
    });
  },
  removeBook: (bookToRemove) => {
    set((state: BookState) => {
      if (window.confirm("Are you sure you want to remove this book?")) {
        const updatedBooks = state.books.filter(
          (book) => book.key !== bookToRemove.key
        );
        localStorage.setItem("readingList", JSON.stringify(updatedBooks));
        return { books: updatedBooks };
      }
      return state;
    });
  },
  moveBook: (bookToMove, newStatus) => {
    set((state: BookState) => {
      const updatedBooks = state.books.map((book) => {
        if (book.key === bookToMove.key) {
          return { ...book, status: newStatus };
        }
        return book;
      });
      localStorage.setItem("readingList", JSON.stringify(updatedBooks));
      return { books: updatedBooks };
    });
  },
  loadBooksFromLocalStorage: () => {
    const storedBooks = localStorage.getItem("readingList");
    if (storedBooks) {
      set({ books: JSON.parse(storedBooks) });
    } else {
      set({ books: [] });
    }
  },
  //   reorderBooks: (
  //     listType: Book["status"],
  //     startIndex: number,
  //     endIndex: number
  //   ) => {
  //     set((state: BookState) => {
  //       const filteredBooks = state.books.filter(
  //         (book) => book.status === listType
  //       );
  //       const [reorderedBook] = filteredBooks.splice(startIndex, 1);
  //       filteredBooks.splice(endIndex, 0, reorderedBook);
  //       const updatedBooks = state.books.map((book) => {
  //         if (book.status === listType) {
  //           return filteredBooks.shift()!;
  //         }
  //         return book;
  //       });
  //       localStorage.setItem("readingList", JSON.stringify(updatedBooks));
  //     });
  //   },
}));
