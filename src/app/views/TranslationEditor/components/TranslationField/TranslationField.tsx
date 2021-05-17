import React from 'react';
import { IUseFieldProps, useField } from 'react-ocean-forms';
import { useTranslationFieldStyles } from './TranslationField.styles';

interface TranslationFieldProps extends IUseFieldProps<string> {}

export const TranslationField: React.FC<TranslationFieldProps> = (props: TranslationFieldProps) => {
  const classes = useTranslationFieldStyles();
  const { fieldProps } = useField(props);

  const fieldValue = typeof fieldProps.value !== 'string' ? '' : fieldProps.value;
  const isRtl = props.name === 'ar' ? 'rtl' : undefined;

  return <textarea className={classes.textarea} dir={isRtl} {...fieldProps} value={fieldValue} />;
};
