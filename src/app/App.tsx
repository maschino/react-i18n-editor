import React from 'react';

import { MuiThemeProvider } from '@material-ui/core';

import { Layout } from './components/Layout';
import { CrashDisplay } from './components/CrashDisplay';
import { BackendMessageDisplay } from './components/BackendMessageDisplay';
import { BusyContextProvider } from './components/BusyContext';
import { ProjectContextProvider } from './components/ProjectContext';
import { appTheme } from './App.theme';

export const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CrashDisplay>
        <BackendMessageDisplay />
        <BusyContextProvider>
          <ProjectContextProvider>
            <Layout />
          </ProjectContextProvider>
        </BusyContextProvider>
      </CrashDisplay>
    </MuiThemeProvider>
  );
};
