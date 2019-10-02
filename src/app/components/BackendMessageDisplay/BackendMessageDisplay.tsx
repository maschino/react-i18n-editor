import React, { useState, useCallback, useEffect } from 'react';

import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import { Close, CheckCircle, Warning, Error, Info } from '@material-ui/icons';

import { backendService } from '../../services/backendService';
import { IBackendMessage } from '../../../shared/IBackendMessage';
import { useBackendMessageDisplayStyles } from './BackendMessageDisplay.styles';

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

export const BackendMessageDisplay: React.FC = () => {
  const classes = useBackendMessageDisplayStyles();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('info');

  useEffect(() => {
    backendService.onBackendMessage((backendMessage: IBackendMessage) => {
      setMessage(backendMessage.message);
      setVariant(backendMessage.type);
      setVisible(true);
    });
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const Icon = variantIcon[variant];

  return (
    <Snackbar
      className={classes.margin}
      open={visible}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes[variant]}
        message={
          <span className={classes.message}>
            <Icon className={`${classes.icon} ${classes.iconVariant}`} />
            {message}
          </span>
        }
        action={
          <IconButton
            color="inherit"
            onClick={handleClose}
          >
            <Close className={classes.icon} />
          </IconButton>
        }
      />
    </Snackbar>
  );
};
