import { app, BrowserWindow, ipcMain, IpcMainEvent, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { autoUpdater } from 'electron-updater';

import { ITranslations } from './shared/ITranslations';
import { EVENT_NAMES } from './shared/eventNames';
import { loadTranslation } from './backend/services/loadTranslation';
import { saveTranslation } from './backend/services/saveTranslation';
import { loadProject } from './backend/services/loadProject';
import { dispatchBusyEvent } from './backend/events/dispatchBusyEvent';
import { dispatchProjectSelectedEvent } from './backend/events/dispatchProjectSelectedEvent';
import { dispatchTranslationLoadedEvent } from './backend/events/dispatchTranslationLoadedEvent';
import { dispatchBackendMessageEvent } from './backend/events/dispatchBackendMessageEvent';

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
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true
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

ipcMain.on(EVENT_NAMES.REQUEST_PROJECT_FOLDER, (event: IpcMainEvent) => {
  try {
    dispatchBusyEvent(event.sender, true);
    if (mainWindow === null) return;

    dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    }, async (directory?: string[]) => {
      if (directory === undefined || directory.length === 0) {
        dispatchBusyEvent(event.sender, false);
        return;
      }

      const projects = await loadProject(directory[0]);
      if (projects.length === 0) {
        dispatchBackendMessageEvent(event.sender, {
          type: 'warning',
          message: `Could not find any translation projects in '${directory[0]}'`,
        });
      }

      dispatchProjectSelectedEvent(event.sender, projects);
      dispatchBusyEvent(event.sender, false);
    });
  } catch (error) {
    dispatchBackendMessageEvent(event.sender, {
      type: 'error',
      message: (error as Error).message,
    });
    dispatchBusyEvent(event.sender, false);
  }
});

ipcMain.on(EVENT_NAMES.REQUEST_TRANSLATION_CONTENT, async (event: IpcMainEvent, projectPath: string) => {
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
});

ipcMain.on(EVENT_NAMES.REQUEST_SAVE_TRANSLATION, async (event: IpcMainEvent, content: ITranslations, translationPath: string) => {
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
});
