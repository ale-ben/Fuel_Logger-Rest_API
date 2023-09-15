'use client';

import React from 'react';
import InputField from './components/InputField';
import OutputBox from './components/OutputBox';

import {
  BulkInputReducer,
  BulkInputStateModel,
} from '@/models/BulkInputStateModel';

const initialStatus: BulkInputStateModel = {
  fuelLogs: [],
  errorLogs: [],
  inputBox: '',
};

const BulkLogger = () => {
  const [state, dispatch] = React.useReducer(BulkInputReducer, initialStatus);

  return (
    <div className="flex h-full max-h-full flex-row overflow-hidden">
      <InputField state={state} dispatch={dispatch} />
      <OutputBox state={state} dispatch={dispatch} />
    </div>
  );
};

export default BulkLogger;
