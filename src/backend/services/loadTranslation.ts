import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

import { ITranslations } from '../../shared/ITranslations';

interface ITranslationFile {
  [key: string]: string;
}

async function loadTranslationFile(path: string): Promise<ITranslationFile> {
  try {
    const data = fs.readFileSync(path, { encoding: 'utf-8' });
    const parsedData = JSON.parse(data);

    return parsedData;
  } catch(error) {
    throw new Error(`Could not parse translation file '${path}': ${error.message}`);
  }
}

export async function loadTranslation(basePath: string): Promise<ITranslations> {
  const languages = glob.sync('*.json', { cwd: basePath });
  const loadedFiles = await Promise.all(languages.map(lang => loadTranslationFile(path.join(basePath, lang))));
  const parsedTranslations: ITranslations = { };

  loadedFiles.forEach((file, index) => {
    const language = languages[index].replace('.json', '');
    Object.keys(file).forEach(key => {
      const value = file[key];
      if (parsedTranslations[key] === undefined) {
        parsedTranslations[key] = {
          [language]: value,
        };
      } else {
        parsedTranslations[key][language] = value;
      }
    });
  });

  return parsedTranslations;
}
