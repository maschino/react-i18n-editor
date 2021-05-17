import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
import { Translations } from '../../../../../shared/Translations';
import { TranslationLine } from '../TranslationLine';
import { AddTranslationKeyForm } from './components/AddTranslationKeyForm';
import { useTranslationTableStyles } from './TranslationTable.styles';

const niceLangNames: Record<string, string> = {
  de: 'German',
  en: 'English',
  ar: 'Arabic',
  el: 'Greek',
};

interface TranslationTableProps {
  data: Translations;
  showOnlyFiltered: boolean;
  showOnlyMissing: boolean;
}

export const TranslationTable: React.FC<TranslationTableProps> = ({
  data,
  showOnlyFiltered,
  showOnlyMissing,
}) => {
  const classes = useTranslationTableStyles();
  const [addedKeys, setAddedKeys] = useState<string[]>([]);

  const languages = useMemo(() => {
    return Object.values(data)
      .map((translation) => Object.keys(translation))
      .reduce((item, arr) => [...arr, ...item], [])
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => {
        if (a === 'en') return -1;
        if (b === 'en') return 1;

        return a.localeCompare(b);
      });
  }, [data]);

  const languageHeaders = useMemo(() => {
    return languages.map((lang) => <TableCell key={lang}>{niceLangNames[lang]}</TableCell>);
  }, [languages]);

  const translationLines = useMemo(() => {
    return Object.keys(data).map((key) => (
      <TranslationLine
        name={key}
        key={key}
        languages={languages}
        showOnlyFiltered={showOnlyFiltered}
        showOnlyMissing={showOnlyMissing}
      />
    ));
  }, [data, languages, showOnlyFiltered, showOnlyMissing]);

  const customLines = useMemo(() => {
    return addedKeys.map((key) => (
      <TranslationLine
        name={key}
        key={key}
        languages={languages}
        showOnlyFiltered={showOnlyFiltered}
        showOnlyMissing={showOnlyMissing}
      />
    ));
  }, [addedKeys, languages, showOnlyFiltered, showOnlyMissing]);

  const handleAddKey = useCallback(
    (newKey: string) => {
      setAddedKeys([...addedKeys, newKey]);
    },
    [addedKeys]
  );

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell className={classes.idCell}>ID</TableCell>
          {languageHeaders}
        </TableRow>
      </TableHead>
      <TableBody>
        <React.Suspense fallback={<div>oida</div>}>
          {translationLines}
          {customLines}
        </React.Suspense>
      </TableBody>
      <TableFooter>
        <TableRow>
          <AddTranslationKeyForm
            data={data}
            addedKeys={addedKeys}
            idCellClass={classes.idCell}
            onKeyAdded={handleAddKey}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};
