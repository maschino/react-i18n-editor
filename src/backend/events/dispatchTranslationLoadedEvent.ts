import { WebContents } from 'electron';
import { EVENT_NAMES } from '../../shared/eventNames';
import { Translations } from '../../shared/Translations';

export function dispatchTranslationLoadedEvent(
  to: WebContents,
  translation: Translations,
  projectPath: string
): void {
  to.send(EVENT_NAMES.TRANSLATION_LOADED, translation, projectPath);
}
