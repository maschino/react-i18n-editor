import React from 'react';

import { InputBase } from '@material-ui/core';
import { useField, IUseFieldProps } from 'react-ocean-forms';

interface TranslationFieldProps extends IUseFieldProps { }

export const TranslationField: React.FC<TranslationFieldProps> = (props: TranslationFieldProps) => {
  const { fieldProps } = useField(props);

  const fieldValue = typeof fieldProps.value !== 'string' ? '' : fieldProps.value;
  const isRtl = props.name === 'ar' ? 'rtl' : undefined;

  return (
    <InputBase
      margin="dense"
      multiline
      fullWidth
      dir={isRtl}
      {...fieldProps}
      value={fieldValue}
    />
  );
};
