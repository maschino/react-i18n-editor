import React, { useContext, useCallback } from 'react';

import { withStyles, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { searchBoxStyles, SearchBoxStyledProps } from './SearchBox.styles';
import { SearchContext } from '../SearchContext';

export const SearchBox = withStyles(searchBoxStyles)(({ classes }: SearchBoxStyledProps) => {
  const { searchString, setSearchString } = useContext(SearchContext);
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setSearchString(event.target.value);
  }, [setSearchString]);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={searchString}
        onChange={handleChange}
      />
    </div>
  );
});
