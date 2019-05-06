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
  const [ showOnlyMissing, setShowOnlyMissing ] = useState(false);

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

  const handleShowOnlyMissingChange = useCallback((event: unknown, checked: boolean) => {
    setShowOnlyMissing(checked);
  }, []);

  return (
    <Form defaultValues={data} onSubmit={handleSubmit}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" id="tableTitle">
          Translation file
        </Typography>
        <div>
          <FormControlLabel control={<Switch value="only-missing" checked={showOnlyMissing} onChange={handleShowOnlyMissingChange} />} label="Show only missing" />
          <FormControlLabel control={<Switch value="only-filtered" checked={showOnlyFiltered} onChange={handleShowOnlyFilteredChange} />} label="Show only filtered" />
        </div>
      </Toolbar>

      <TranslationTable data={data} showOnlyFiltered={showOnlyFiltered} showOnlyMissing={showOnlyMissing} />
      <FabFormButton component={Fab} className={classes.fab} color="secondary" type="submit" disabled={busy}>
        <Save />
      </FabFormButton>
    </Form>
  );
});
