import { createContext } from 'react';

import { IProjectInfo } from '../../../shared/IProjectInfo';

export const ProjectContext = createContext<IProjectInfo[]>([]);

