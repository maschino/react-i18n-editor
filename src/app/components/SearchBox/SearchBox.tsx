import React, { useContext, useCallback } from 'react';

import { InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { useSearchBoxStyles } from './SearchBox.styles';
import { SearchContext } from '../SearchContext';

export const SearchBox: React.FC = () => {
  const classes = useSearchBoxStyles();
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
};
