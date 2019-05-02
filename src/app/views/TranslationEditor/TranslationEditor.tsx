import React, { useState, useEffect, useCallback, useContext } from 'react';

import { withStyles, Fab, Typography, Toolbar, FormControlLabel, Switch } from '@material-ui/core';
import { FabProps } from '@material-ui/core/Fab';
import { Save } from '@material-ui/icons';
import { Form, FormButton, IFormButtonProps } from 'react-ocean-forms';

import { backendService } from '../../services/backendService';
import { ITranslations } from '../../../shared/ITranslations';
import { BusyContext } from '../../components/BusyContext';
import { translationEditorStyles, TranslationEditorStyledProps } from './TranslationEditor.styles';
import { TranslationTable } from './components/TranslationTable';

const FabFormButton: React.FC<IFormButtonProps | FabProps | { component: typeof Fab }> = FormButton;

export const TranslationEditor = withStyles(translationEditorStyles)(({ classes }: TranslationEditorStyledProps) => {
  const [ data, setData ] = useState<ITranslations>({});
  const [ projectPath, setProjectPath ] = useState<string>('');
  const [ showOnlyFiltered, setShowOnlyFiltered ] = useState(false);
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

  const handleShowOnlyFilteredChange = useCallback((event: unknown, checked: boolean) => {
    setShowOnlyFiltered(checked);
  }, []);

  return (
    <Form defaultValues={data} onSubmit={handleSubmit}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" id="tableTitle">
          Translation file
        </Typography>
        <FormControlLabel control={<Switch value="only-filtered" checked={showOnlyFiltered} onChange={handleShowOnlyFilteredChange} />} label="Show only filtered" />
      </Toolbar>

      <TranslationTable data={data} showOnlyFiltered={showOnlyFiltered} />
      <FabFormButton component={Fab} className={classes.fab} color="secondary" type="submit" disabled={busy}>
        <Save />
      </FabFormButton>
    </Form>
  );
});
