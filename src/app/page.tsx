"use client";
import BookList from "@/components/BookList";
import BookSearch, { Book } from "@/components/BookSearch";
import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem("readingList");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  const addBook = (book: Book) => {
    const newBooks = [...books, book];
    setBooks(newBooks);
    localStorage.setItem("readingList", JSON.stringify(newBooks));
  };

  const moveBook = (bookToMove: Book, newStatus: Book["status"]) => {
    const newBooks = books.map((b) => {
      if (b.key === bookToMove.key) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    setBooks(newBooks);
    localStorage.setItem("readingList", JSON.stringify(newBooks));
  };

  const removeBook = (bookToRemove: Book) => {
    if (window.confirm("Are you sure you want to remove this book?")) {
      const newBooks = books.filter((b) => b.key !== bookToRemove.key);
      setBooks(newBooks);
      localStorage.setItem("readingList", JSON.stringify(newBooks));
    }
  };

  return (
    <div className="contianer mx-auto">
      <BookSearch onAddBook={addBook} />
      <BookList books={books} onMoveBook={moveBook} onRemoveBook={removeBook} />
    </div>
  );
}
