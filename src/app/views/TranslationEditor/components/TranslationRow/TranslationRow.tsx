import React, { useContext, useMemo } from 'react';

import { TableRow, TableCell } from '@material-ui/core';
import { useFormContext } from 'react-ocean-forms';

import { SearchContext } from '../../../../components/SearchContext';
import { LineTitle } from './components/LineTitle';
import { LanguageCells } from './components/LanguageCells';

import { useTranslationRowStyles } from './TranslationRow.styles';

interface TranslationRowProps {
  languages: string[];
  name: string;
  showOnlyFiltered: boolean;
  showOnlyMissing: boolean;
}

function checkIsMissing(values: string[]): boolean {
  return values.some(value => value === undefined || value === '');
}

function checkIsFiltered(searchString: string, name: string, values: string[]): boolean {
  if (searchString === '') return false;

  const lowerCaseSearchString = searchString.toLowerCase();
  return (name.toLowerCase().indexOf(lowerCaseSearchString) !== -1 || values.some(item => item !== undefined && item.toLowerCase().indexOf(lowerCaseSearchString) !== -1));
}

export const TranslationRow: React.FC<TranslationRowProps> = ({ languages, name, showOnlyFiltered, showOnlyMissing }) => {
  const classes = useTranslationRowStyles();
  const { searchString } = useContext(SearchContext);
  const { getValues } = useFormContext();

  const rowClassName = useMemo(() => {
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

    return classes.hiddenRow;
  }, [classes.hiddenRow, getValues, name, searchString, showOnlyFiltered, showOnlyMissing]);

  return (
    <TableRow key={name} className={rowClassName}>
      <TableCell component="th" className={classes.idCell} title={name}>
        <LineTitle name={name} />
      </TableCell>
      <LanguageCells languages={languages} />
    </TableRow>
  );
};
