import { FuelLog, ErrorLog, parseFuelNote } from './FuelLog';

export interface BulkInputStateModel {
  fuelLogs: FuelLog[];
  errorLogs: ErrorLog[];
  inputBox: string;
}

export type Actions =
  | {
      type: 'PARSE';
    }
  | {
      type: 'REMOVE';
      payload: number;
    }
  | {
      type: 'CLEAR';
    }
  | {
      type: 'EXPORT';
    }
  | {
      type: 'EDIT';
      payload: FuelLog;
    }
  | {
      type: 'INPUT';
      payload: string;
    };

export const BulkInputReducer = (
  state: BulkInputStateModel,
  action: Actions,
): BulkInputStateModel => {
  switch (action.type) {
    case 'PARSE':
      console.log('Parsing fuel logs');
      let result = parseFuelNote(state.inputBox);
      return {
        ...state,
        fuelLogs: state.fuelLogs.concat(result.logs),
        inputBox: result.errors.map((e) => e.log).join('\n\n'),
        errorLogs: result.errors,
      };
    case 'REMOVE':
      console.debug(
        'Deleting',
        state.fuelLogs.filter((fuelLog) => fuelLog.id === action.payload),
      );
      return {
        ...state,
        fuelLogs: state.fuelLogs.filter(
          (fuelLog) => fuelLog.id !== action.payload,
        ),
      };
    case 'CLEAR':
      console.log('Clearing fuel logs');
      return {
        ...state,
        fuelLogs: [],
        errorLogs: [],
        inputBox: '',
      };
    case 'EXPORT':
      console.warn('ACTION NOT IMPLEMENTED');
      console.log('Export');
      return state;
    case 'EDIT':
      console.log('Editing', action.payload);
      return {
        ...state,
        fuelLogs: state.fuelLogs.map((fuelLog) =>
          fuelLog.id === action.payload.id ? action.payload : fuelLog,
        ),
      };
    case 'INPUT':
      console.log('Input', action.payload);
      return {
        ...state,
        inputBox: action.payload,
      };
    default:
      throw new Error();
  }
};
