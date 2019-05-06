import React, { useContext, useMemo } from 'react';

import { TableRow, TableCell, withStyles } from '@material-ui/core';
import { useFormContext } from 'react-ocean-forms';

import { SearchContext } from '../../../../components/SearchContext';
import { LineTitle } from './components/LineTitle';
import { LanguageCells } from './components/LanguageCells';

import { TranslationRowStyledProps, translationRowStyles } from './TranslationRow.styles';

interface TranslationRowProps extends TranslationRowStyledProps {
  languages: string[];
  name: string;
  showOnlyFiltered: boolean;
  showOnlyMissing: boolean;
}

function checkIsMissing(values: string[]): boolean {
  return values.some(value => value === '');
}

function checkIsFiltered(searchString: string, name: string, values: string[]): boolean {
  if (searchString === '') return false;

  const lowerCaseSearchString = searchString.toLocaleLowerCase();
  return (name.toLocaleLowerCase().indexOf(lowerCaseSearchString) !== -1 || values.some(item => item.toLocaleLowerCase().indexOf(lowerCaseSearchString) !== -1));
}

export const TranslationRow = withStyles(translationRowStyles)(({ languages, name, showOnlyFiltered, showOnlyMissing, classes }: TranslationRowProps) => {
  const { searchString } = useContext(SearchContext);
  const { getValues } = useFormContext();

  const rowStyle = useMemo(() => {
    if (!showOnlyFiltered && !showOnlyMissing) return undefined;

    const { [name]: groupValues } = getValues();
    const values = typeof groupValues === 'object' && groupValues !== null ? Object.values(groupValues) : [];

    const isFiltered = showOnlyFiltered && checkIsFiltered(searchString, name, values);
    const isMissing = showOnlyMissing && checkIsMissing(values);

    if (showOnlyMissing && showOnlyFiltered && isMissing && isFiltered) {
      return undefined;
    }
    else if (showOnlyMissing && isMissing && !showOnlyFiltered) {
      return undefined;
    }
    else if (showOnlyFiltered && isFiltered && !showOnlyMissing) {
      return undefined;
    }

    return {
      display: 'none',
    };
  }, [getValues, name, searchString, showOnlyFiltered, showOnlyMissing]);

  return (
    <TableRow key={name} style={rowStyle}>
      <TableCell component="th" className={classes.idCell} title={name}>
        <LineTitle name={name} />
      </TableCell>
      <LanguageCells languages={languages} />
    </TableRow>
  );
});
