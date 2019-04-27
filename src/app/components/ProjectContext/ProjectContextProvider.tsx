import React, { useState, useEffect } from 'react';

import { IProjectInfo } from '../../../shared/IProjectInfo';
import { backendService } from '../../services/backendService';
import { ProjectContext } from './ProjectContext';

export const ProjectContextProvider: React.FC = ({ children }) => {
  const [projects, setProjects] = useState<IProjectInfo[]>([]);

  useEffect(() => {
    backendService.onProjectSelected(setProjects);
  }, []);

  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};
