import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

export interface VehiclesActionGetAllVehicles
  extends Action<'GET_VEHICLES'> {
  vehicles: Array<object>;
}
export interface VehiclesActionGetAllVehicleModels
  extends Action<'GET_VEHICLE_MODELS'> {
  vehicleModels: Array<object>;
}
export interface VehiclesActionGetAllVehicleTypes
  extends Action<'GET_VEHICLE_TYPES'> {
  vehicleTypes: Array<object>;
}
export interface VehiclesActionGetAllVehicleBrands
  extends Action<'GET_VEHICLE_BRANDS'> {
  vehicleBrands: Array<object>;
}
export interface VehiclesActionGetAllVehicleConfigurations
  extends Action<'GET_VEHICLE_CONFIGURATIONS'> {
  vehicleConfigurations: Array<object>;
}

export type VehiclesAction =
  | VehiclesActionGetAllVehicles
  | VehiclesActionGetAllVehicleModels
  | VehiclesActionGetAllVehicleTypes
  | VehiclesActionGetAllVehicleBrands
  | VehiclesActionGetAllVehicleConfigurations;

export const GET_VEHICLES = 'GET_VEHICLES';
export const GET_VEHICLE_MODELS = 'GET_VEHICLE_MODELS';
export const GET_VEHICLE_TYPES = 'GET_VEHICLE_TYPES';
export const GET_VEHICLE_BRANDS = 'GET_VEHICLE_BRANDS';
export const GET_VEHICLE_CONFIGURATIONS = 'GET_VEHICLE_CONFIGURATIONS';
interface QueryStringType extends Object {
  query: string;
}
type GraphQueryString = QueryStringType;
function fetchGraphQL({ query }: GraphQueryString) {
  const fetchURL = `https://azaryah.sdyalor.me/api/graphql`;
  return fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: query
    })
  })
    .then(r => r.json())
    .then(r => r.data);
  //  .then(r => r.data);
}
/*  Fetch fromVehicles */
/** historial vehiculos*/
type ThunkResult = ThunkAction<void, RootState, undefined, VehiclesAction>;

export const getAllVehicles: ActionCreator<
  ThunkResult
> = () => dispatch => {
  return fetchGraphQL({
    query: `query { vehiculo {codVehiculo codMarca codModelo codTipo placa codConfiguracion} }`
  }).then(vehicles => dispatch({ type: GET_VEHICLES, vehicles }));
};

export const getAllVehicleModels: ActionCreator<
  ThunkResult
> = () => dispatch => {
  return fetchGraphQL({
    query: `query { modeloVehiculo { codModelo descripcion } }`
  }).then(vehicleModels =>
    dispatch({ type: GET_VEHICLE_MODELS, vehicleModels })
  );
};

export const getAllVehicleTypes: ActionCreator<
  ThunkResult
> = () => dispatch => {
  return fetchGraphQL({
    query: `query { tipoVehiculo { codTipo descripcion } }`
  }).then(vehicleTypes =>
    dispatch({ type: GET_VEHICLE_TYPES, vehicleTypes })
  );
};

export const getAllVehicleBrands: ActionCreator<
  ThunkResult
> = () => dispatch => {
  return fetchGraphQL({
    query: `query { marcaVehiculo { codMarca descripcion } }`
  }).then(vehicleBrands =>
    dispatch({ type: GET_VEHICLE_BRANDS, vehicleBrands })
  );
};

export const getAllVehicleConfigurations: ActionCreator<
  ThunkResult
> = () => dispatch => {
  return fetchGraphQL({
    query: `query { configuracion { codConfi descripcion } }`
  }).then(vehicleConfigurations =>
    dispatch({ type: GET_VEHICLE_CONFIGURATIONS, vehicleConfigurations })
  );
};
