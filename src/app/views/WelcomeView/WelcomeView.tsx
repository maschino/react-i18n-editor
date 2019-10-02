import React, { useState, useContext } from 'react';

import { Typography, Button } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { Ghost } from 'react-kawaii';

import { backendService } from '../../services/backendService';
import { BusyContext } from '../../components/BusyContext';
import { useWelcomeViewStyles } from './WelcomeView.styles';

export const WelcomeView: React.FC = () => {
  const classes = useWelcomeViewStyles();
  const [hovered, setHovered] = useState(false);
  const busy = useContext(BusyContext);

  const ghostClass = busy ? 'lovestruck' : hovered ? 'blissful' : 'happy';

  return (
    <div className={classes.container}>
      <Typography variant="h5" color="inherit">
        Welcome to translation editor
      </Typography>
      <Typography variant="h6" color="inherit">
        Please choose a project folder
      </Typography>
      <div className={classes.ghostContainer}>
        <Ghost size={240} mood={ghostClass} color={blueGrey['200']} />
      </div>
      <Button variant="contained" color="secondary" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} onClick={backendService.requestProjectFolder}>
        Select project folder
      </Button>
    </div>
  );
};
