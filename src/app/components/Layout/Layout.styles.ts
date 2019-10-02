import { Theme, createStyles, WithStyles } from '@material-ui/core';

export const layoutStyles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
});

export type StyledLayoutProps = WithStyles<typeof layoutStyles>;
