import React from 'react';

import { FieldGroup } from 'react-ocean-forms';
import { TableRow, TableCell, withStyles } from '@material-ui/core';

import { TranslationField } from '../TranslationField';
import { TranslationLineStyledProps, translationLineStyles } from './TranslationLine.styles';

interface ITranslationLineProps extends TranslationLineStyledProps {
  name: string;
  languages: string[];
}

export const TranslationLine = withStyles(translationLineStyles)(({ name, languages, classes }: ITranslationLineProps) => {
  return (
    <FieldGroup name={name} label={name} render={() => (
      <TableRow key={name}>
        <TableCell component="th" className={classes.idCell}>{name}</TableCell>
        {languages.map(lang => (
          <TableCell key={`tc-tf-${lang}`}>
            <TranslationField name={lang} label={lang} />
          </TableCell>
        ))}
      </TableRow>
    )} />
  );
});
