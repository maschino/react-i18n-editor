import { createStyles, Theme, WithStyles } from '@material-ui/core';

export const translationEditorStyles = (theme: Theme) => createStyles({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export type TranslationEditorStyledProps = WithStyles<typeof translationEditorStyles>;
