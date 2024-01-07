"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export type Book = {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
  number_of_pages_median: number;
  status: "done" | "inProgress" | "backlog";
};

function BookSearch({ onAddBook }: { onAddBook: (book: Book) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 100;

  type SearchResult = {
    docs: Book[];
    numFound: number;
  };

  const searchBooks = async (page: number = 1) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get<SearchResult>(
        `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${resultsPerPage}}`
      );
      setResults(response.data.docs);
      setTotalResults(response.data.numFound);
      setCurrentPage(page);
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
              <TableHead className="p-2"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((book, index) => (
              <TableRow key={index}>
                <TableCell className="">{book.title}</TableCell>
                <TableCell className="">{book.author_name}</TableCell>
                <TableCell className="">{book.first_publish_year}</TableCell>
                <TableCell className="">
                  {book.number_of_pages_median || "-"}
                </TableCell>
                <TableCell className="">
                  <Button
                    variant="link"
                    onClick={() =>
                      onAddBook({
                        key: book.key,
                        title: book.title,
                        author_name: book.author_name,
                        first_publish_year: book.first_publish_year,
                        number_of_pages_median:
                          book.number_of_pages_median || null,
                        status: "backlog",
                      })
                    }
                    disabled={loading}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          Page {currentPage} - {currentPage * resultsPerPage} of {totalResults}
        </div>
        <div>
          <Button
            variant="outline"
            disabled={currentPage === 1 || loading}
            onClick={() => searchBooks(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={currentPage * resultsPerPage >= totalResults || loading}
            onClick={() => searchBooks(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookSearch;
