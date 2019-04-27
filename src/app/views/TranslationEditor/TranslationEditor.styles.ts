import { createStyles, Theme, WithStyles } from '@material-ui/core';

export const translationEditorStyles = (theme: Theme) => createStyles({
  idCell: {
    maxWidth: '150px',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

export type TranslationEditorStyledProps = WithStyles<typeof translationEditorStyles>;
