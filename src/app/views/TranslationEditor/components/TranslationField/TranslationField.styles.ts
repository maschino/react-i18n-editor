import { Theme, createStyles, WithStyles } from '@material-ui/core';

export const translationFieldStyles = (theme: Theme) => createStyles({
  textfield: {
    width: '100%',
  },
});

export type TranslationFieldStyledProps = WithStyles<typeof translationFieldStyles>;
