import { createStyles, WithStyles, Theme } from '@material-ui/core';

export const crashDisplayStyles = (theme: Theme) => createStyles({
  container: {
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  ghostContainer: {
    margin: '40px 0',
  },
  errorTitle: {
    marginTop: '20px',
    color: theme.palette.error.main,
    fontWeight: "bold"
  }
});

export type CrashDisplayStyledProps = WithStyles<typeof crashDisplayStyles>;
