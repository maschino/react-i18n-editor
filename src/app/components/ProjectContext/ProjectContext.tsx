import { createContext } from 'react';
import { ProjectInfo } from '../../../shared/ProjectInfo';


export const ProjectContext = createContext<ProjectInfo[]>([]);
