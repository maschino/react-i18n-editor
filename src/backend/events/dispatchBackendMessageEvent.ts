import { WebContents } from 'electron';
import { BackendMessage } from '../../shared/BackendMessage';
import { EVENT_NAMES } from '../../shared/eventNames';

export function dispatchBackendMessageEvent(to: WebContents, message: BackendMessage): void {
  to.send(EVENT_NAMES.BACKEND_MESSAGE, message);
}
