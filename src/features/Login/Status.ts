
import React, { createContext, useContext, useState } from 'react';

interface StatusContextType {
  status: string | null;
  setStatus: (status: string | null) => void;
}

export const StatusContext = createContext<StatusContextType>({
  status: null,
  setStatus: () => {},
});