"use client";
import BookList from "@/components/BookList";
import BookSearch, { Book } from "@/components/BookSearch";
import { useStore } from "@/store";
import { useEffect, useState } from "react";

export default function Home() {
  const { loadBooksFromLocalStorage } = useStore((state) => state);

  useEffect(() => {
    loadBooksFromLocalStorage();
  }, [loadBooksFromLocalStorage]);

  return (
    <div className="contianer mx-auto">
      <BookSearch />
      <BookList />
    </div>
  );
}
