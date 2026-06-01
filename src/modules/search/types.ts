export interface SearchState {
  query: string;
  results: SearchResult[];
  loading: boolean;
  searched: boolean;
}

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  slug: string;
  metaTitle?: string;
  match?: string;
}
