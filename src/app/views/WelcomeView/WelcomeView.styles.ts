import { createStyles, WithStyles } from '@material-ui/core';

export const welcomeViewStyles = () => createStyles({
  container: {
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  ghostContainer: {
    margin: '40px 0',
  }
});

export type WelcomeViewStyledProps = WithStyles<typeof welcomeViewStyles>;
