import { Theme, createStyles, WithStyles } from '@material-ui/core';

const drawerWidth = 240;

export const mainMenuStyles = (theme: Theme) => createStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});

export type StyledMainMenuProps = WithStyles<typeof mainMenuStyles>;
