import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { ProjectInfo } from '../../shared/ProjectInfo';

/**
 * Searches for the base package path based on the given searchPath.
 * It searches for a package.json while traversing upwards in the
 * folder hierarchy. Useful in combination with the `resolve` package.
 * @param searchPath Resolved / included file path
 */
const recursiveSearchPackagePath = (searchPath: string): string | undefined => {
  // Search for a package.json in the current directory
  const packageJsonPath = path.join(searchPath, 'package.json');

  const absoluteSearchPath = path.resolve(searchPath);

  if (fs.existsSync(packageJsonPath)) {
    return searchPath;
  }

  const parentPath = path.join(searchPath, '..');
  const absoluteParentPath = path.resolve(parentPath);

  if (absoluteSearchPath === absoluteParentPath) {
    // We need this check otherwise we would be in an endless loop of ../../../
    return undefined;
  }

  // No package.json found in current directory, traverse up
  return recursiveSearchPackagePath(path.join(searchPath, '..'));
};

export async function loadProject(basePath: string): Promise<ProjectInfo[]> {
  const translationFiles = glob.sync(path.join(basePath, '**/i18n/messages/*.json'), {
    ignore: ['**/build/**', '**/node_modules/**', '**/.git/**'],
  });

  const projects: Record<string, ProjectInfo> = {};

  translationFiles.forEach((file) => {
    const packageJsonPath = recursiveSearchPackagePath(file);
    if (packageJsonPath === undefined) return;

    if (projects[packageJsonPath] === undefined) {
      projects[packageJsonPath] = {
        name: path.basename(packageJsonPath),
        path: packageJsonPath,
      };
    }
  });

  return Object.values(projects);
}
