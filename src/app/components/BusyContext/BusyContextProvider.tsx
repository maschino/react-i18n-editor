import React, { useState, useEffect } from 'react';

import { backendService } from '../../services/backendService';
import { BusyContext } from './BusyContext';

export const BusyContextProvider: React.FC = ({ children }) => {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    backendService.onBusy(setBusy);
  }, []);

  return <BusyContext.Provider value={busy}>{children}</BusyContext.Provider>;
};
