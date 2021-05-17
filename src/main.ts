import { app, BrowserWindow, dialog, ipcMain, IpcMainEvent } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import * as isDev from 'electron-is-dev';
import { autoUpdater } from 'electron-updater';
import * as path from 'path';
import * as url from 'url';
import { dispatchBackendMessageEvent } from './backend/events/dispatchBackendMessageEvent';
import { dispatchBusyEvent } from './backend/events/dispatchBusyEvent';
import { dispatchProjectSelectedEvent } from './backend/events/dispatchProjectSelectedEvent';
import { dispatchTranslationLoadedEvent } from './backend/events/dispatchTranslationLoadedEvent';
import { loadProject } from './backend/services/loadProject';
import { loadTranslation } from './backend/services/loadTranslation';
import { saveTranslation } from './backend/services/saveTranslation';
import { EVENT_NAMES } from './shared/eventNames';
import { Translations } from './shared/Translations';

let mainWindow: BrowserWindow | null = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.removeMenu();
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS);
  }
});

ipcMain.on(EVENT_NAMES.REQUEST_PROJECT_FOLDER, async (event: IpcMainEvent) => {
  try {
    dispatchBusyEvent(event.sender, true);
    if (mainWindow === null) return;

    const { filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    if (filePaths === undefined || filePaths.length === 0) {
      dispatchBusyEvent(event.sender, false);
      return;
    }

    const projects = await loadProject(filePaths[0]);
    if (projects.length === 0) {
      dispatchBackendMessageEvent(event.sender, {
        type: 'warning',
        message: `Could not find any translation projects in '${filePaths[0]}'`,
      });
    }

    dispatchProjectSelectedEvent(event.sender, projects);
    dispatchBusyEvent(event.sender, false);
  } catch (error) {
    dispatchBackendMessageEvent(event.sender, {
      type: 'error',
      message: (error as Error).message,
    });
    dispatchBusyEvent(event.sender, false);
  }
});

ipcMain.on(
  EVENT_NAMES.REQUEST_TRANSLATION_CONTENT,
  async (event: IpcMainEvent, projectPath: string) => {
    try {
      dispatchBusyEvent(event.sender, true);

      const translationPath = path.join(projectPath, 'src/i18n/messages');
      const parsedTranslations = await loadTranslation(translationPath);

      dispatchTranslationLoadedEvent(event.sender, parsedTranslations, translationPath);
      dispatchBusyEvent(event.sender, false);
      dispatchBackendMessageEvent(event.sender, {
        type: 'info',
        message: 'Translations loaded',
      });
    } catch (error) {
      dispatchBackendMessageEvent(event.sender, {
        type: 'error',
        message: (error as Error).message,
      });
      dispatchBusyEvent(event.sender, false);
    }
  }
);

ipcMain.on(
  EVENT_NAMES.REQUEST_SAVE_TRANSLATION,
  async (event: IpcMainEvent, content: Translations, translationPath: string) => {
    try {
      dispatchBusyEvent(event.sender, true);

      await saveTranslation(translationPath, content);

      dispatchBusyEvent(event.sender, false);
      dispatchBackendMessageEvent(event.sender, {
        type: 'success',
        message: 'Files successfully saved',
      });
    } catch (error) {
      dispatchBackendMessageEvent(event.sender, {
        type: 'error',
        message: (error as Error).message,
      });
      dispatchBusyEvent(event.sender, false);
    }
  }
);
