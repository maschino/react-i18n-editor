import React, { useContext } from 'react';

import { AppBar, Toolbar, Typography, LinearProgress, IconButton } from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';

import { backendService } from '../../services/backendService';
import { BusyContext } from '../BusyContext';
import { useTopBarStyles } from './TopBar.styles';
import { SearchBox } from '../SearchBox';

export const TopBar: React.FC = () => {
  const classes = useTopBarStyles();
  const busy = useContext(BusyContext);

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit">
          Translation Editor
        </Typography>
        <SearchBox />
        <div>
          <IconButton color="inherit" onClick={backendService.requestProjectFolder}>
            <FolderOpen />
          </IconButton>
        </div>
      </Toolbar>
      <LinearProgress hidden={!busy} />
    </AppBar>
  );
};
