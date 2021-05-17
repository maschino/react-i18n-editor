import Electron from 'electron';
import { BackendMessage } from '../../shared/BackendMessage';
import { EVENT_NAMES } from '../../shared/eventNames';
import { ProjectInfo } from '../../shared/ProjectInfo';
import { Translations } from '../../shared/Translations';

interface ElectronWindow extends Window {
  require(module: 'electron'): typeof Electron;
  oida(): string;
}

// eslint-disable-next-line no-var
declare var window: ElectronWindow;
const browserElectron = window.require('electron');

export const backendService = {
  requestProjectFolder: () => {
    browserElectron.ipcRenderer.send(EVENT_NAMES.REQUEST_PROJECT_FOLDER);
  },

  onProjectSelected: (callback: (projects: ProjectInfo[]) => void) => {
    browserElectron.ipcRenderer.on(
      EVENT_NAMES.PROJECT_SELECTED,
      (event: Electron.Event, data: ProjectInfo[]) => {
        callback(data);
      }
    );
  },

  requestTranslationContent: (path: string) => {
    browserElectron.ipcRenderer.send(EVENT_NAMES.REQUEST_TRANSLATION_CONTENT, path);
  },

  requestSaveTranslation: (translations: Translations, projectPath: string) => {
    browserElectron.ipcRenderer.send(
      EVENT_NAMES.REQUEST_SAVE_TRANSLATION,
      translations,
      projectPath
    );
  },

  onBusy: (callback: (busy: boolean) => void) => {
    browserElectron.ipcRenderer.on(
      EVENT_NAMES.BACKEND_BUSY,
      (event: Electron.Event, busy: boolean) => {
        callback(busy);
      }
    );
  },

  onTranslationLoaded: (callback: (data: Translations, projectPath: string) => void) => {
    browserElectron.ipcRenderer.on(
      EVENT_NAMES.TRANSLATION_LOADED,
      (event: Electron.Event, data: Translations, projectPath: string) => {
        callback(data, projectPath);
      }
    );
  },

  onBackendMessage: (callback: (message: BackendMessage) => void) => {
    browserElectron.ipcRenderer.on(
      EVENT_NAMES.BACKEND_MESSAGE,
      (event: Electron.Event, message: BackendMessage) => {
        callback(message);
      }
    );
  },
};
