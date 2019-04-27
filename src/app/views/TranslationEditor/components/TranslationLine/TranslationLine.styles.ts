import { createStyles, WithStyles } from '@material-ui/core';

export const translationLineStyles = () => createStyles({
  idCell: {
    maxWidth: '150px',
  }
});

export type TranslationLineStyledProps = WithStyles<typeof translationLineStyles>;
