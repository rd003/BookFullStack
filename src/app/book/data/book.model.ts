// Generated by https://quicktype.io

export interface Book {
  Id: string;
  Author: string;
  Country: string;
  ImageLink: string;
  Language: string;
  Link: string;
  Pages: number;
  Title: string;
  Year: number;
  Price: number;
}

export interface BookResponse {
  books: Book[];
  totalCount: number;
}

export class BookParams {
  searchTerm: string | null = null;
  _page: number | null = null;
  _limit: number | null = null;
  sortColumn: string | null = null;
  sortDirection: "asc" | "desc" | null = null;
}