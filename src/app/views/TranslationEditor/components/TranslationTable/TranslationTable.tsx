import React, { useMemo } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, withStyles } from '@material-ui/core';

import { ITranslations } from '../../../../../shared/ITranslations';
import { TranslationLine } from '../TranslationLine';
import { translationTableStyles, TranslationTableStyledProps } from './TranslationTable.styles';

const niceLangNames = {
  de: 'German',
  en: 'English',
  ar: 'Arabic',
  el: 'Greek'
};

interface TranslationTableProps extends TranslationTableStyledProps {
  data: ITranslations;
  showOnlyFiltered: boolean;
  showOnlyMissing: boolean;
}

export const TranslationTable = withStyles(translationTableStyles)(({ classes, data, showOnlyFiltered, showOnlyMissing }: TranslationTableProps) => {
  const languages = useMemo(() => {
    return Object.values(data)
      .map(translation => Object.keys(translation))
      .reduce((item, arr) => ([ ...arr, ...item ]), [])
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a === 'en' ? - 1 : a.localeCompare(b));
  }, [data]);

  const languageHeaders = useMemo(() => {
    return languages.map(lang => <TableCell key={lang}>{niceLangNames[lang]}</TableCell>);
  }, [languages]);

  const translationLines = useMemo(() => {
    return Object.keys(data).map(key => (
      <TranslationLine
        name={key}
        key={key}
        languages={languages}
        showOnlyFiltered={showOnlyFiltered}
        showOnlyMissing={showOnlyMissing}
      />
    ));
  }, [data, languages, showOnlyFiltered, showOnlyMissing]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.idCell}>ID</TableCell>
          {languageHeaders}
        </TableRow>
      </TableHead>
      <TableBody>
        {translationLines}
      </TableBody>
    </Table>
  );
});
