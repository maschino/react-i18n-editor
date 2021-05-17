import { MuiThemeProvider } from '@material-ui/core';
import { appTheme } from './App.theme';
import { BackendMessageDisplay } from './components/BackendMessageDisplay';
import { BusyContextProvider } from './components/BusyContext';
import { CrashDisplay } from './components/CrashDisplay';
import { Layout } from './components/Layout';
import { ProjectContextProvider } from './components/ProjectContext';
import { SearchContextProvider } from './components/SearchContext';

export const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CrashDisplay>
        <BackendMessageDisplay />
        <BusyContextProvider>
          <ProjectContextProvider>
            <SearchContextProvider>
              <Layout />
            </SearchContextProvider>
          </ProjectContextProvider>
        </BusyContextProvider>
      </CrashDisplay>
    </MuiThemeProvider>
  );
};
