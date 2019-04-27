import { WebContents } from 'electron';

import { EVENT_NAMES } from '../../shared/eventNames';
import { IProjectInfo } from '../../shared/IProjectInfo';

export function dispatchProjectSelectedEvent(to: WebContents, projects: IProjectInfo[]): void {
  to.send(EVENT_NAMES.PROJECT_SELECTED, projects);
}
