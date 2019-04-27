import Electron from 'electron';

import { ITranslations } from '../../shared/ITranslations';
import { EVENT_NAMES } from '../../shared/eventNames';
import { IProjectInfo } from '../../shared/IProjectInfo';
import { IBackendMessage } from '../../shared/IBackendMessage';

interface ElectronWindow extends Window {
  require(module: 'electron'): typeof Electron;
  oida(): string;
}

declare var window: ElectronWindow;
const browserElectron = window.require('electron');

export const backendService = {
  requestProjectFolder: () => {
    browserElectron.ipcRenderer.send(EVENT_NAMES.REQUEST_PROJECT_FOLDER);
  },

  onProjectSelected: (callback: (projects: IProjectInfo[]) => void) => {
    browserElectron.ipcRenderer.on(EVENT_NAMES.PROJECT_SELECTED, (event: Electron.Event, data: IProjectInfo[]) => { callback(data); });
  },

  requestTranslationContent: (path: string) => {
    browserElectron.ipcRenderer.send(EVENT_NAMES.REQUEST_TRANSLATION_CONTENT, path);
  },

  requestSaveTranslation: (translations: ITranslations, projectPath: string) => {
    browserElectron.ipcRenderer.send(EVENT_NAMES.REQUEST_SAVE_TRANSLATION, translations, projectPath);
  },

  onBusy: (callback: (busy: boolean) => void) => {
    browserElectron.ipcRenderer.on(EVENT_NAMES.BACKEND_BUSY, (event: Electron.Event, busy: boolean) => { callback(busy); });
  },

  onTranslationLoaded: (callback: (data: ITranslations, projectPath: string) => void) => {
    browserElectron.ipcRenderer.on(EVENT_NAMES.TRANSLATION_LOADED, (event: Electron.Event, data: ITranslations, projectPath: string) => { callback(data, projectPath); });
  },

  onBackendMessage: (callback: (message: IBackendMessage) => void) => {
    browserElectron.ipcRenderer.on(EVENT_NAMES.BACKEND_MESSAGE, (event: Electron.Event, message: IBackendMessage) => { callback(message); });
  },
};
