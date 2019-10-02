import React, { useMemo, useState, useCallback } from 'react';

import { TableCell, TextField, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { ITranslations } from '../../../../../../../shared/ITranslations';
import { useAddTranslationKeyFormStyles } from './AddTranslationKeyForm.styles';

interface AddTranslationKeyFormProps {
  data: ITranslations;
  addedKeys: string[];
  idCellClass: string;

  onKeyAdded(newKey: string): void;
}

export const AddTranslationKeyForm: React.FC<AddTranslationKeyFormProps> = ({ data, addedKeys, onKeyAdded, idCellClass }) => {
  const classes = useAddTranslationKeyFormStyles();
  const [newName, setNewName] = useState('');
  const knownKeys = useMemo(() => Object.keys(data), [data]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setNewName(event.target.value);
  }, [setNewName]);

  const handleClick = useCallback(() => {
    if (newName === '') return;
    if (knownKeys.includes(newName) || addedKeys.includes(newName)) {
      alert(`Error: the key '${newName} already exists in this translation file.`);
      return;
    }

    setNewName('');
    onKeyAdded(newName);
  }, [addedKeys, knownKeys, newName, onKeyAdded]);

  return (
    <>
      <TableCell className={idCellClass}>
        <TextField fullWidth value={newName} onChange={handleChange} placeholder="Translation key" />
      </TableCell>
      <TableCell>
        <Button color="primary" variant="contained" size="small" onClick={handleClick}>
          <Add className={`${classes.leftIcon} ${classes.iconSmall}`} />
          Add new translation key
        </Button>
      </TableCell>
    </>
  );
};
