import React from 'react';

import { TextField, withStyles } from '@material-ui/core';
import { useField, IUseFieldProps } from 'react-ocean-forms';

import { TranslationFieldStyledProps, translationFieldStyles } from './TranslationField.styles';

interface ITranslationFieldProps extends IUseFieldProps, TranslationFieldStyledProps { }

export const TranslationField = withStyles(translationFieldStyles)(({ classes, ...other }: ITranslationFieldProps) => {
  const { fieldProps } = useField(other);

  const fieldValue = typeof fieldProps.value !== 'string' ? '' : fieldProps.value;
  const isRtl = other.name === 'ar' ? 'rtl' : undefined;
  const hasError = fieldValue === '';

  return (
    <TextField
      className={classes.textfield}
      margin="dense"
      multiline
      variant="outlined"
      dir={isRtl}
      error={hasError}
      {...fieldProps}
      value={fieldValue}
    />
  );
});
