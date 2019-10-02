import React, { useContext, useCallback, useState, useRef } from 'react';

import { InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { useSearchBoxStyles } from './SearchBox.styles';
import { SearchContext } from '../SearchContext';

export const SearchBox: React.FC = () => {
  const classes = useSearchBoxStyles();
  const { setSearchString } = useContext(SearchContext);
  const [ value, setValue ] = useState('');
  const debounceIdentifier = useRef<number>();

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newValue = event.target.value;
    setValue(newValue);

    if (debounceIdentifier.current !== undefined) {
      window.clearTimeout(debounceIdentifier.current);
    }
    debounceIdentifier.current = window.setTimeout(() => setSearchString(newValue), 400);
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
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
