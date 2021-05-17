import { makeStyles } from '@material-ui/core';

export const useTranslationFieldStyles = makeStyles((theme) => ({
  textarea: {
    display: 'block',
    width: '100%',
    height: 35,
    minHeight: 35,
    border: 'none',
    resize: 'vertical',
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    padding: theme.spacing(1),
  },
}));
