import { makeStyles } from '@material-ui/core';

export const useTopBarStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
