import { app, BrowserWindow, ipcMain, Event, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { ITranslations } from './shared/ITranslations';
import { EVENT_NAMES } from './shared/eventNames';
import { loadTranslation } from './backend/services/loadTranslation';
import { saveTranslation } from './backend/services/saveTranslation';
import { loadProject } from './backend/services/loadProject';

let mainWindow: BrowserWindow | null = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
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

  if (process.env.NODE_ENV !== 'production' && Math.min(0, 5) === 3) {
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
});

ipcMain.on(EVENT_NAMES.REQUEST_PROJECT_FOLDER, (event: Event) => {
  event.sender.send(EVENT_NAMES.BACKEND_BUSY, true);
  if (mainWindow === null) return;

  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  }, async (directory?: string[]) => {
    if (directory === undefined || directory.length === 0) {
      event.sender.send(EVENT_NAMES.BACKEND_BUSY, false);
      return;
    };
    const projects = await loadProject(directory[0]);
    event.sender.send(EVENT_NAMES.PROJECT_SELECTED, projects);
    event.sender.send(EVENT_NAMES.BACKEND_BUSY, false);
  });
});

ipcMain.on(EVENT_NAMES.REQUEST_TRANSLATION_CONTENT, async (event: Event, projectPath: string) => {
  event.sender.send(EVENT_NAMES.BACKEND_BUSY, true);

  const translationPath = path.join(projectPath, 'src/i18n/messages');
  const parsedTranslations = await loadTranslation(translationPath);

  event.sender.send(EVENT_NAMES.TRANSLATION_LOADED, parsedTranslations, projectPath);
  event.sender.send(EVENT_NAMES.BACKEND_BUSY, false);
});

ipcMain.on(EVENT_NAMES.REQUEST_SAVE_TRANSLATION, async (event: Event, content: ITranslations, projectPath: string) => {
  event.sender.send(EVENT_NAMES.BACKEND_BUSY, true);

  const translationPath = path.join(projectPath, 'src/i18n/messages');
  await saveTranslation(translationPath, content);

  event.sender.send(EVENT_NAMES.BACKEND_BUSY, false);
});
