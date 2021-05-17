import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

export const useMainMenuStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));
