import { makeStyles } from '@material-ui/core';

export const useTranslationRowStyles = makeStyles({
  idCell: {
    maxWidth: '150px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  hiddenRow: {
    display: 'none'
  }
});
