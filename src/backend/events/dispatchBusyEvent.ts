import { WebContents } from 'electron';

import { EVENT_NAMES } from '../../shared/eventNames';

export function dispatchBusyEvent(to: WebContents, busy: boolean): void {
  to.send(EVENT_NAMES.BACKEND_BUSY, busy);
}
