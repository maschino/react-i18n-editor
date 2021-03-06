import React, { useContext } from 'react';

import { CssBaseline, Paper } from '@material-ui/core';

import { TranslationEditor } from '../../views/TranslationEditor';
import { WelcomeView } from '../../views/WelcomeView';

import { MainMenu } from '../MainMenu';
import { TopBar } from '../TopBar';
import { ProjectContext } from '../ProjectContext';
import { useLayoutStyles } from './Layout.styles';

export const Layout: React.FC = () => {
  const classes = useLayoutStyles();
  const projects = useContext(ProjectContext);
  const hasProjects = projects.length > 0;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      {hasProjects && <MainMenu />}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper>
          {!hasProjects && <WelcomeView />}
          {hasProjects && <TranslationEditor />}
        </Paper>
      </main>
    </div>
  );
};
