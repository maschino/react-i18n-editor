import React from 'react';

import { MuiThemeProvider } from '@material-ui/core';

import { Layout } from './components/Layout';
import { BusyContextProvider } from './components/BusyContext';
import { ProjectContextProvider } from './components/ProjectContext';
import { appTheme } from './App.theme';

export const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <BusyContextProvider>
        <ProjectContextProvider>
          <Layout />
        </ProjectContextProvider>
      </BusyContextProvider>
    </MuiThemeProvider>
  );
};
