import { WebContents } from 'electron';

import { EVENT_NAMES } from '../../shared/eventNames';
import { IBackendMessage } from '../../shared/IBackendMessage';

export function dispatchBackendMessageEvent(to: WebContents, message: IBackendMessage): void {
  to.send(EVENT_NAMES.BACKEND_MESSAGE, message);
}
