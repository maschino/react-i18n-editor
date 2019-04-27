import * as fs from 'fs';
import * as path from 'path';

import { ITranslations } from '../../shared/ITranslations';

interface ITranslationFile {
  [key: string]: string;
}

async function saveTranslationFile(path: string, content: ITranslationFile): Promise<void> {
  fs.writeFileSync(path, JSON.stringify(content, null, 2), { encoding: 'utf-8' });
}

export async function saveTranslation(basePath: string, translations: ITranslations): Promise<void> {
  const languages: { [key: string]: ITranslationFile } = { };
  Object.keys(translations).forEach(key => {
    const item = translations[key];
    Object.keys(item).forEach(language => {
      if (item[language] === '') return;

      if (languages[language] === undefined) {
        languages[language] = { };
      }

      languages[language][key] = item[language];
    });
  });

  await Promise.all(Object.keys(languages).map(language => saveTranslationFile(
    path.join(basePath, `${language}.json`),
    languages[language],
  )));
}
