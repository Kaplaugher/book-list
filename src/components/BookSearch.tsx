"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  type SearchResult = {
    docs: any[];
    numFound: number;
  };

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get<SearchResult>(
        `https://openlibrary.org/search.json?q=${query}`
      );
      setResults(response.data.docs);
    } catch (error) {
      console.error("Error fetching books", error);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchBooks();
    }
  };

  return (
    <div className="p-4">
      <div className="sm:max-w-xs">
        <Input
          type="text"
          value={query}
          onKeyUp={handleKeyDown}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books"
        />
      </div>
      <Button onClick={() => searchBooks()} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </Button>
      <div className="mt-4 max-h-64 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-2">Title</TableHead>
              <TableHead className="p-2">Author</TableHead>
              <TableHead className="p-2">Year</TableHead>
              <TableHead className="p-2">Page Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((book) => (
              <TableRow key={book.key}>
                <TableCell className="p-2">{book.title}</TableCell>
                <TableCell className="p-2">{book.author_name}</TableCell>
                <TableCell className="p-2">{book.first_publish_year}</TableCell>
                <TableCell className="p-2">
                  {book.number_of_pages_median || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default BookSearch;
