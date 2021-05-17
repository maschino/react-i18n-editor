import React from 'react';

import { Paper, Typography, withStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Ghost } from 'react-kawaii';

import { crashDisplayStyles, CrashDisplayStyledProps } from './CrashDisplay.styles';

interface CrashDisplayState {
  hasError: boolean;
  error?: Error;
}

interface CrashDisplayProps extends CrashDisplayStyledProps {}

export const CrashDisplay = withStyles(crashDisplayStyles)(
  class CrashDisplay extends React.Component<CrashDisplayProps, CrashDisplayState> {
    constructor(props: CrashDisplayProps) {
      super(props);

      this.state = {
        hasError: false,
      };
    }

    public static getDerivedStateFromError(error: Error): Partial<CrashDisplayState> | null {
      return {
        hasError: true,
        error,
      };
    }

    public render(): React.ReactNode {
      const { children, classes } = this.props;
      const { hasError, error } = this.state;

      if (hasError) {
        return (
          <Paper className={classes.container}>
            <Typography variant="h5" color="inherit">
              Translation editor
            </Typography>
            <Typography variant="h6" color="inherit">
              Oh no! The app has crashed.
            </Typography>
            <div className={classes.ghostContainer}>
              <Ghost size={240} mood="ko" color={red[100]} />
            </div>
            <Typography variant="body1" color="inherit">
              Something happened to make the app crash completely. This is not supposed to happen.
              Hopefully the details below can help you understand what went wrong.
            </Typography>
            {error !== undefined && (
              <>
                <Typography variant="subtitle1" className={classes.errorTitle}>
                  {error.message}
                </Typography>
                <pre>{error.stack}</pre>
              </>
            )}
          </Paper>
        );
      }

      return children;
    }
  }
);
