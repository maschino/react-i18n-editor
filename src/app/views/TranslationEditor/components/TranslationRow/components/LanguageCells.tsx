import React, { useMemo } from 'react';

import { TableCell } from '@material-ui/core';

import { TranslationField } from '../../TranslationField';

interface LanguageCellsProps {
  languages: string[];
}

export const LanguageCells: React.FC<LanguageCellsProps> = ({ languages }) => {
  const cells = useMemo(() => {
    return languages.map((lang) => (
      <TableCell key={`tc-tf-${lang}`}>
        <TranslationField name={lang} label={lang} />
      </TableCell>
    ));
  }, [languages]);

  return <>{cells}</>;
};
