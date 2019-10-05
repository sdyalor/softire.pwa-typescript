import { Reducer } from 'redux';
import {
  GET_TIRES,
  GET_TIRE_CONDITIONS,
  GET_TIRE_BRANDS,
  GET_TIRE_MODELS,
  GET_TIRE_DESIGNS,
  GET_TIRE_MEASURES
} from '../actions/tiresActions';
import { RootAction } from '../store';

export interface TiresState {
  tires: Array<object>;
  tireConditions: Array<object>;
  tireBrands: Array<object>;
  tireModels: Array<object>;
  tireDesigns: Array<object>;
  tireMeasures: Array<object>;
  error: string;
}

const INITIAL_STATE: TiresState = {
  tires: [],
  tireConditions: [],
  tireBrands: [],
  tireModels: [],
  tireDesigns: [],
  tireMeasures: [],
  error: ''
};

export const tiresReducer: Reducer<TiresState, RootAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case GET_TIRES:
      return {
        ...state,
        tires: action.tires
      };
    case GET_TIRE_CONDITIONS:
      return {
        ...state,
        tireConditions: action.tireConditions
      };
    case GET_TIRE_BRANDS:
      return {
        ...state,
        tireBrands: action.tireBrands
      };
    case GET_TIRE_MODELS:
      return {
        ...state,
        tireModels: action.tireModels
      };
    case GET_TIRE_DESIGNS:
      return {
        ...state,
        tireDesigns: action.tireDesigns
      };
    case GET_TIRE_MEASURES:
      return {
        ...state,
        tireMeasures: action.tireMeasures
      };
    default:
      return state;
  }
};
