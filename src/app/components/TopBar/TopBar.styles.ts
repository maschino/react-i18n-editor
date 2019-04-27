import { WithStyles, createStyles, Theme } from '@material-ui/core';

export const topBarStyles = (theme: Theme) => createStyles({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export type TopBarStyledProps = WithStyles<typeof topBarStyles>;
