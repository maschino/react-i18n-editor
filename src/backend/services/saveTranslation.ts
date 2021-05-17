import * as fs from 'fs';
import * as path from 'path';
import { Translations } from '../../shared/Translations';

interface ITranslationFile {
  [key: string]: string;
}

async function saveTranslationFile(path: string, content: ITranslationFile): Promise<void> {
  try {
    fs.writeFileSync(path, JSON.stringify(content, null, 2), { encoding: 'utf-8' });
  } catch (error) {
    throw new Error(`Could not save translation file '${path}': ${error.message}`);
  }
}

export async function saveTranslation(basePath: string, translations: Translations): Promise<void> {
  const languages: { [key: string]: ITranslationFile } = {};
  Object.keys(translations).forEach((key) => {
    const item = translations[key];
    Object.keys(item).forEach((language) => {
      if (item[language] === '') return;

      if (languages[language] === undefined) {
        languages[language] = {};
      }

      languages[language][key] = item[language];
    });
  });

  await Promise.all(
    Object.keys(languages).map((language) =>
      saveTranslationFile(path.join(basePath, `${language}.json`), languages[language])
    )
  );
}
