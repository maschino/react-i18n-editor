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
}

export const TranslationRow = withStyles(translationRowStyles)(({ languages, name, showOnlyFiltered, classes }: TranslationRowProps) => {
  const { searchString } = useContext(SearchContext);
  const { getValues } = useFormContext();

  const rowStyle = useMemo(() => {
    if (!showOnlyFiltered) return undefined;

    const lowerCaseSearchString = searchString.toLocaleLowerCase();

    const { [name]: groupValues } = getValues();
    const values = typeof groupValues === 'object' && groupValues !== null ? Object.values(groupValues) : [];

    if (name.toLocaleLowerCase().indexOf(lowerCaseSearchString) !== -1 || values.some(item => item.toLocaleLowerCase().indexOf(lowerCaseSearchString) !== -1)) return undefined;

    return {
      display: 'none',
    };
  }, [getValues, name, searchString, showOnlyFiltered]);

  return (
    <TableRow key={name} style={rowStyle}>
      <TableCell component="th" className={classes.idCell} title={name}>
        <LineTitle name={name} />
      </TableCell>
      <LanguageCells languages={languages} />
    </TableRow>
  );
});
