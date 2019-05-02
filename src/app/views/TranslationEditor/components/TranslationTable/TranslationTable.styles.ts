import { createStyles, WithStyles } from '@material-ui/core';

export const translationTableStyles = () => createStyles({
  idCell: {
    maxWidth: '150px',
  },
});

export type TranslationTableStyledProps = WithStyles<typeof translationTableStyles>;
