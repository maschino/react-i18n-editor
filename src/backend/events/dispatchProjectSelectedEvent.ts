import { WebContents } from 'electron';
import { EVENT_NAMES } from '../../shared/eventNames';
import { ProjectInfo } from '../../shared/ProjectInfo';

export function dispatchProjectSelectedEvent(to: WebContents, projects: ProjectInfo[]): void {
  to.send(EVENT_NAMES.PROJECT_SELECTED, projects);
}
