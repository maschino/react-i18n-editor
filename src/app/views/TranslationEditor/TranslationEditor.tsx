import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';

import { Table, TableHead, TableCell, TableRow, TableBody, withStyles, Fab } from '@material-ui/core';
import { FabProps } from '@material-ui/core/Fab';
import { Save } from '@material-ui/icons';
import { Form, FormButton, IFormButtonProps } from 'react-ocean-forms';

import { backendService } from '../../services/backendService';
import { ITranslations } from '../../../shared/ITranslations';
import { TranslationLine } from './components/TranslationLine';
import { BusyContext } from '../../components/BusyContext';
import { translationEditorStyles, TranslationEditorStyledProps } from './TranslationEditor.styles';

const niceLangNames = {
  de: 'German',
  en: 'English',
  ar: 'Arabic',
  el: 'Greek'
};

const FabFormButton: React.FC<IFormButtonProps | FabProps | { component: typeof Fab }> = FormButton;

export const TranslationEditor = withStyles(translationEditorStyles)(({ classes }: TranslationEditorStyledProps) => {
  const [ data, setData ] = useState<ITranslations>({});
  const [ projectPath, setProjectPath ] = useState<string>('');
  const busy = useContext(BusyContext);

  useEffect(() => {
    backendService.onTranslationLoaded((newData, newPath) => {
      setData(newData);
      setProjectPath(newPath);
    });
  }, []);

  const handleSubmit = useCallback((values: ITranslations) => {
    backendService.requestSaveTranslation(values, projectPath);
  }, [projectPath]);

  const languages = useMemo(() => {
    return Object.values(data)
      .map(translation => Object.keys(translation))
      .reduce((item, arr) => ([ ...arr, ...item ]), [])
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a === 'en' ? - 1 : a.localeCompare(b));
  }, [data]);

  return (
    <Form defaultValues={data} onSubmit={handleSubmit}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.idCell}>ID</TableCell>
            {languages.map(lang => <TableCell key={lang}>{niceLangNames[lang]}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data).map(key => <TranslationLine name={key} key={key} languages={languages} />)}
        </TableBody>
      </Table>
      <FabFormButton component={Fab} className={classes.fab} color="secondary" type="submit" disabled={busy}>
        <Save />
      </FabFormButton>
    </Form>
  );
});
