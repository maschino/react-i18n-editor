import React, { useContext } from 'react';

import { AppBar, Toolbar, Typography, withStyles, LinearProgress, IconButton } from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';

import { backendService } from '../../services/backendService';
import { BusyContext } from '../BusyContext';
import { topBarStyles, TopBarStyledProps } from './TopBar.styles';

export const TopBar = withStyles(topBarStyles)(({ classes }: TopBarStyledProps) => {
  const busy = useContext(BusyContext);

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit">
          Translation Editor
        </Typography>
        <div>
          <IconButton color="inherit" onClick={backendService.requestProjectFolder}>
            <FolderOpen />
          </IconButton>
        </div>
      </Toolbar>
      <LinearProgress hidden={!busy} />
    </AppBar>
  );
});
