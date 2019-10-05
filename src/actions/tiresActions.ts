import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
export const GET_TIRES = 'GET_TIRES';
export const GET_TIRE_CONDITIONS = 'GET_TIRE_CONDITIONS';
export const GET_TIRE_DESIGNS = 'GET_TIRE_DESIGNS';
export const GET_TIRE_BRANDS = 'GET_TIRE_BRANDS';
export const GET_TIRE_MEASURES = 'GET_TIRE_MEASURES';
export const GET_TIRE_MODELS = 'GET_TIRE_MODELS';

/* Action for store*/
export interface TiresActionGetTires extends Action<'GET_TIRES'> {
  tires: Array<object>;
}
export interface TiresActionGetAllTireConditions
  extends Action<'GET_TIRE_CONDITIONS'> {
  tireConditions: Array<object>;
}
export interface TiresActionGetAllTireDesigns
  extends Action<'GET_TIRE_DESIGNS'> {
  tireDesigns: Array<object>;
}
export interface TiresActionGetAllTireBrands
  extends Action<'GET_TIRE_BRANDS'> {
  tireBrands: Array<object>;
}
export interface TiresActionGetAllTireMeasures
  extends Action<'GET_TIRE_MEASURES'> {
  tireMeasures: Array<object>;
}
export interface TiresActionGetAllTireModels
  extends Action<'GET_TIRE_MODELS'> {
  tireModels: Array<object>;
}
export type TiresAction =
  | TiresActionGetTires
  | TiresActionGetAllTireBrands
  | TiresActionGetAllTireDesigns
  | TiresActionGetAllTireConditions
  | TiresActionGetAllTireMeasures
  | TiresActionGetAllTireModels;

type ThunkResult = ThunkAction<void, RootState, undefined, TiresAction>;

const fetchURL = `https://azaryah.sdyalor.me/api/graphql`;

export const getAllTires: ActionCreator<ThunkResult> = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `query { neumaticos { codNeumatico codMarca codModelo codMedida codDiseno estado codProveedor} }`
    })
  })
    .then(r => r.json())
    .then(tires => dispatch({ type: GET_TIRES, tires: tires.data }));
};

export const getAllTireConditions: ActionCreator<
  ThunkResult
> = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `query { condicionesNeumatico { codCondicion descripcion } }`
    })
  })
    .then(r => r.json())
    .then(conditions =>
      dispatch({
        type: GET_TIRE_CONDITIONS,
        tireConditions: conditions.data
      })
    );
};

export const getAllTireDesigns: ActionCreator<
  ThunkResult
> = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `query { disenosNeumatico { codDiseno descripcion } }`
    })
  })
    .then(r => r.json())
    .then(designs =>
      dispatch({ type: GET_TIRE_DESIGNS, tireDesigns: designs.data })
    );
};

export const getAllTireBrands: ActionCreator<
  ThunkResult
> = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `query { marcaNeumatico { codMarca descripcion } }`
    })
  })
    .then(r => r.json())
    .then(brands =>
      dispatch({ type: GET_TIRE_BRANDS, tireBrands: brands.data })
    );
};

export const getAllTireMeasures: ActionCreator<
  ThunkResult
> = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `query { medidaNeumatico { codMedida descripcion } }`
    })
  })
    .then(r => r.json())
    .then(measures =>
      dispatch({ type: GET_TIRE_MEASURES, tireMeasures: measures.data })
    );
};

export const getAllTireModels: ActionCreator<
  ThunkResult
> = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `query { modeloNeumatico { codModelo descripcion } }`
    })
  })
    .then(r => r.json())
    .then(models =>
      dispatch({ type: GET_TIRE_MODELS, tireModels: models.data })
    );
};
