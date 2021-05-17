import React, { useState, useMemo } from 'react';
import { SearchContext } from './SearchContext';

export const SearchContextProvider: React.FC = ({ children }) => {
  const [searchString, setSearchString] = useState<string>('');
  const searchContext = useMemo(
    () => ({
      searchString,
      setSearchString,
    }),
    [searchString]
  );

  return <SearchContext.Provider value={searchContext}>{children}</SearchContext.Provider>;
};
