import { Reducer } from 'redux';
import {
  ADD_DESCRIPTIONS_TO_TIRES,
  ADD_DESCRIPTIONS_TO_VEHICLES
} from '../actions/viewsActions';
import { RootAction } from '../store';

export interface ViewsState {
  tiresView: Array<object>;
  vehiclesView: Array<object>;
}
const INITIAL_STATE: ViewsState = {
  tiresView: [],
  vehiclesView: []
};

export const viewsReducer: Reducer<ViewsState, RootAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case ADD_DESCRIPTIONS_TO_TIRES:
      return {
        ...state,
        tiresView: action.tiresView
      };
    case ADD_DESCRIPTIONS_TO_VEHICLES:
      return {
        ...state,
        vehiclesView: action.vehiclesView
      };
    default:
      return state;
  }
};
