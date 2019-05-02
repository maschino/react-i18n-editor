import { createStyles, WithStyles } from '@material-ui/core';

export const translationRowStyles = () => createStyles({
  idCell: {
    maxWidth: '150px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
});

export type TranslationRowStyledProps = WithStyles<typeof translationRowStyles>;
