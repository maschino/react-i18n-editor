import React, { useContext } from 'react';

import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { FolderOpenTwoTone } from '@material-ui/icons';

import { backendService } from '../../services/backendService';
import { BusyContext } from '../BusyContext';
import { ProjectContext } from '../ProjectContext';
import { useMainMenuStyles } from './MainMenu.styles';

export const MainMenu: React.FC = () => {
  const classes = useMainMenuStyles();
  const busy = useContext(BusyContext);
  const projects = useContext(ProjectContext);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {projects.map(project => (
          <ListItem key={project.path} button onClick={() => backendService.requestTranslationContent(project.path)} disabled={busy}>
            <ListItemIcon><FolderOpenTwoTone /></ListItemIcon>
            <ListItemText primary={project.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
