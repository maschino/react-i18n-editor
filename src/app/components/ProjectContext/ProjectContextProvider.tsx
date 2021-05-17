import React, { useEffect, useState } from 'react';
import { ProjectInfo } from '../../../shared/ProjectInfo';
import { backendService } from '../../services/backendService';
import { ProjectContext } from './ProjectContext';


export const ProjectContextProvider: React.FC = ({ children }) => {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);

  useEffect(() => {
    backendService.onProjectSelected(setProjects);
  }, []);

  return <ProjectContext.Provider value={projects}>{children}</ProjectContext.Provider>;
};
