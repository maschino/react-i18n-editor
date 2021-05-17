import { Fab, FormControlLabel, Switch, Toolbar, Typography } from '@material-ui/core';
import { FabProps } from '@material-ui/core/Fab';
import { Save } from '@material-ui/icons';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Form, FormButton, IFormButtonProps } from 'react-ocean-forms';
import { Translations } from '../../../shared/Translations';
import { BusyContext } from '../../components/BusyContext';
import { backendService } from '../../services/backendService';
import { TranslationTable } from './components/TranslationTable';
import { useTranslationEditorStyles } from './TranslationEditor.styles';

const FabFormButton: React.FC<IFormButtonProps | FabProps | { component: typeof Fab }> = FormButton;

export const TranslationEditor: React.FC = () => {
  const classes = useTranslationEditorStyles();
  const [data, setData] = useState<Translations>({});
  const [projectPath, setProjectPath] = useState<string>('');
  const [showOnlyFiltered, setShowOnlyFiltered] = useState(false);
  const [showOnlyMissing, setShowOnlyMissing] = useState(false);

  const busy = useContext(BusyContext);

  useEffect(() => {
    backendService.onTranslationLoaded((newData, newPath) => {
      setData(newData);
      setProjectPath(newPath);
    });
  }, []);

  const handleSubmit = useCallback(
    (values: Translations) => {
      backendService.requestSaveTranslation(values, projectPath);
    },
    [projectPath]
  );

  const handleShowOnlyFilteredChange = useCallback((event: unknown, checked: boolean) => {
    setShowOnlyFiltered(checked);
  }, []);

  const handleShowOnlyMissingChange = useCallback((event: unknown, checked: boolean) => {
    setShowOnlyMissing(checked);
  }, []);

  if (projectPath === '') {
    return (
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Please choose a project from the project list on the left.
        </Typography>
      </Toolbar>
    );
  }

  return (
    <Form defaultValues={data} onSubmit={handleSubmit}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" id="tableTitle">
          Translation file
        </Typography>
        <div>
          <FormControlLabel
            control={
              <Switch
                value="only-missing"
                checked={showOnlyMissing}
                onChange={handleShowOnlyMissingChange}
              />
            }
            label="Show only missing"
          />
          <FormControlLabel
            control={
              <Switch
                value="only-filtered"
                checked={showOnlyFiltered}
                onChange={handleShowOnlyFilteredChange}
              />
            }
            label="Show only filtered"
          />
        </div>
      </Toolbar>

      <TranslationTable
        data={data}
        showOnlyFiltered={showOnlyFiltered}
        showOnlyMissing={showOnlyMissing}
      />
      <FabFormButton
        component={Fab}
        className={classes.fab}
        color="secondary"
        type="submit"
        disabled={busy}
      >
        <Save />
      </FabFormButton>
    </Form>
  );
};
