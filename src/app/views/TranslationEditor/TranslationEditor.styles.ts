import { makeStyles } from '@material-ui/core';

export const useTranslationEditorStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
