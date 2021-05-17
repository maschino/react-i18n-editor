import { createContext } from 'react';
export interface SearchContext {
  searchString: string;
  setSearchString(searchString: string): void;
}

export const SearchContext = createContext<SearchContext>({
  searchString: '',
  setSearchString: () => void 0,
});
