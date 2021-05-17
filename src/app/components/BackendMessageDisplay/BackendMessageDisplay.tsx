import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import { CheckCircle, Close, Error, Info, Warning } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { BackendMessage } from '../../../shared/BackendMessage';
import { backendService } from '../../services/backendService';
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
  const [variant, setVariant] = useState<keyof typeof variantIcon>('info');

  useEffect(() => {
    backendService.onBackendMessage((backendMessage: BackendMessage) => {
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
          <IconButton color="inherit" onClick={handleClose}>
            <Close className={classes.icon} />
          </IconButton>
        }
      />
    </Snackbar>
  );
};
