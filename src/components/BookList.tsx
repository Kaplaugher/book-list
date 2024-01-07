"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Book, useStore } from "@/store";

function BookList() {
  const { books, removeBook, moveBook } = useStore((state) => state);
  const moveToList = (book: Book, targetList: Book["status"]) => {
    moveBook(book, targetList);
  };

  const renderBookItem = (book: Book, index: number, listType: string) => {
    return (
      <Card key={index}>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>{book.author_name}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button variant="destructive" onClick={() => removeBook(book)}>
            Remove
          </Button>
          <div className="inline-flex gap-2">
            <Button
              className="btn btn-sm btn-outline"
              onClick={() => moveToList(book, "backlog")}
              disabled={listType === "backlog"}
            >
              Backlog
            </Button>
            <Button
              className="btn btn-sm btn-outline"
              onClick={() => moveToList(book, "inProgress")}
              disabled={listType === "inProgress"}
            >
              In Progress
            </Button>
            <Button
              className="btn btn-sm btn-outline"
              onClick={() => moveToList(book, "done")}
              disabled={listType === "done"}
            >
              Done
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };
  return (
    <div className="space-y-8 p-4">
      <h2 className="mb-4 text-2xl font-bold">My Reading List</h2>

      {books.filter((b) => b.status === "backlog").length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Backlog</h2>
          <div>
            {books
              .filter((b) => b.status === "backlog")
              .map((book, index) => renderBookItem(book, index, "backlog"))}
          </div>
        </div>
      )}

      {books.filter((b) => b.status === "inProgress").length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">In Progress</h2>
          <div>
            {books
              .filter((b) => b.status === "inProgress")
              .map((book, index) => renderBookItem(book, index, "inProgress"))}
          </div>
        </div>
      )}
      {books.filter((b) => b.status === "done").length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Done</h2>
          <div>
            {books
              .filter((b) => b.status === "done")
              .map((book, index) => renderBookItem(book, index, "done"))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
