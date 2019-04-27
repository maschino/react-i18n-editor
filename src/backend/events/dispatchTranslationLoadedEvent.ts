import { WebContents } from 'electron';

import { EVENT_NAMES } from '../../shared/eventNames';
import { ITranslations } from '../../shared/ITranslations';

export function dispatchTranslationLoadedEvent(to: WebContents, translation: ITranslations, projectPath: string): void {
  to.send(EVENT_NAMES.TRANSLATION_LOADED, translation, projectPath);
}
