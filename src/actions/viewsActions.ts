import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState, store } from '../store';
import { find as rFind, map as rMap } from 'ramda';
export const ADD_DESCRIPTIONS_TO_TIRES = 'ADD_DESCRIPTION_TO_TIRES';
export const ADD_DESCRIPTIONS_TO_VEHICLES = 'ADD_DESCRIPTION_TO_VEHICLES';

export interface ViewsActionAddDescriptionsToTires
  extends Action<'ADD_DESCRIPTION_TO_TIRES'> {
  tiresView: Array<object>;
}
export interface ViewsActionAddDescriptionsToVehicles
  extends Action<'ADD_DESCRIPTION_TO_VEHICLES'> {
  vehiclesView: Array<object>;
}
export type ViewsAction =
  | ViewsActionAddDescriptionsToTires
  | ViewsActionAddDescriptionsToVehicles;

type ThunkResult = ThunkAction<void, RootState, undefined, ViewsAction>;

export const addDescriptionsToTires: ActionCreator<
  ThunkResult
> = () => dispatch => {
  if (
    //@ts-ignore
    store.getState().tires.tires.neumaticos &&
    //@ts-ignore
    store.getState().tires.tireConditions.condicionesNeumatico
  ) {
    //@ts-ignore
    const _tiresBrands = store.getState().tires.tireBrands.marcaNeumatico;
    //@ts-ignore
    const _tiresModels = store.getState().tires.tireModels.modeloNeumatico;
    //@ts-ignore
    const _tiresMeasures = store.getState().tires.tireMeasures
      .medidaNeumatico;
    //@ts-ignore
    const _tiresDesings = store.getState().tires.tireDesigns
      .disenosNeumatico;
    //@ts-ignore
    const _tires = store.getState().tires.tires.neumaticos;
    let tiresWithDescriptions = [];
    /**
     * MAP Place
     */
    //CallBack Map Function with Brands Binded
    //AddDescriptionTo Returns a object tire with Descriptions
    const addDescriptionTo = (
      brandsBinded: any,
      modelsBinded: any,
      measuresBinded: any,
      designsBinded: any,
      tire: any
    ) => {
      //select brand: brands and a tire returns a brand
      const selectBrand: any = (allBrands: any, aTire: any) => {
        //filterCallback return boolean from comparison, Comparison is between brandCodBrand tireCodBrand
        // takes a brand then a tire that is binded
        /**
         * filterCallback takes a brand and a tire binded
         */
        const filterCallback: any = (aTire: any, brandToFilter: any) =>
          aTire['codMarca'] === brandToFilter['codMarca'];
        //assumming that at least one brand matches
        const brandThatMatches = rFind(filterCallback.bind(null, aTire));
        const aBrand = brandThatMatches(allBrands);
        return aBrand;
      };
      const selectModel: any = (allModels: any, aTire: any) => {
        const filterCallback = (aTire: any, brandToFilter: any) =>
          aTire['codModelo'] === brandToFilter['codModelo'];
        const modelThatMatches = rFind(filterCallback.bind(null, aTire));
        const aBrand = modelThatMatches(allModels);
        return aBrand;
      };
      const selectMeasure = (allMeasures: any, aTire: any) => {
        const filterCallback = (aTire: any, measureToFilter: any) =>
          aTire['codMedida'] === measureToFilter['codMedida'];
        const measureThatMatches = rFind(filterCallback.bind(null, aTire));
        const aMeasure = measureThatMatches(allMeasures);
        return aMeasure;
      };
      const selectDesign = (allDesigns: any, aTire: any) => {
        const filterCallback = (aTire: any, designToFilter: any) =>
          aTire['codDiseno'] === designToFilter['codDiseno'];
        const designThatMatches = rFind(filterCallback.bind(null, aTire));
        const aDesign = designThatMatches(allDesigns);
        return aDesign;
      };

      return {
        ...tire,
        codMarcaDescripcion: selectBrand(brandsBinded, tire)[
          'descripcion'
        ],
        codModeloDescripcion: selectModel(modelsBinded, tire)[
          'descripcion'
        ],
        codMedidaDescripcion: selectMeasure(measuresBinded, tire)[
          'descripcion'
        ],
        codDisenoDescripcion: selectDesign(designsBinded, tire)[
          'descripcion'
        ]
      };
    };

    /**
     * MAP Place
     */

    tiresWithDescriptions = rMap(
      addDescriptionTo.bind(
        null,
        _tiresBrands,
        _tiresModels,
        _tiresMeasures,
        _tiresDesings
      ),
      _tires
    );
    return dispatch({
      type: ADD_DESCRIPTIONS_TO_TIRES,
      tiresView: tiresWithDescriptions
    });
  }
  return 'hi';
};
//@ts-ignore
export const addDescriptionsToVehicles: ActionCreator<
  ThunkResult
> = () => dispatch => {
  if (
    //@ts-ignore
    store.getState().vehicles.vehicles.vehiculo &&
    //@ts-ignore
    store.getState().vehicles.vehicleTypes.tipoVehiculo
  ) {
    //@ts-ignore
    const _vehicleTypes = store.getState().vehicles.vehicleTypes
      .tipoVehiculo;
    //@ts-ignore
    const _vehicleBrands = store.getState().vehicles.vehicleBrands
      .marcaVehiculo;
    //@ts-ignore
    const _vehicleModels = store.getState().vehicles.vehicleModels
      .modeloVehiculo;
    //@ts-ignore
    const _vehicleConfigurations = store.getState().vehicles
      .vehicleConfigurations.configuracion;
    //@ts-ignore
    const _vehicles = store.getState().vehicles.vehicles.vehiculo;
    let vehiclesWithDescriptions = [];

    const addDescriptionTo = (
      typesBinded: any,
      brandsBinded: any,
      modelsBinded: any,
      confsBinded: any,
      vehicle: any
    ) => {
      const selectByKey = (
        sampleSpace: any,
        selectorObject: any,
        keyStringfindICO: any,
        keyStringFilterO: any
      ) => {
        const filterCallback = (
          filterObjectBinded: any,
          keyStringfilterBinded: any,
          keyStringIterableBinded: any,
          findIterableCurrentSample: any
        ) =>
          filterObjectBinded[`${keyStringfilterBinded}`] ===
          findIterableCurrentSample[`${keyStringIterableBinded}`];

        const selectionThatMatches = rFind(
          filterCallback.bind(
            null,
            selectorObject,
            keyStringFilterO,
            keyStringfindICO
          )
        );
        const selection = selectionThatMatches(sampleSpace);
        return selection;
      };

      return {
        ...vehicle,
        codTipoDescripcion: selectByKey(
          typesBinded,
          vehicle,
          'codTipo',
          'codTipo'
        )['descripcion'],
        codMarcaDescripcion: selectByKey(
          brandsBinded,
          vehicle,
          'codMarca',
          'codMarca'
        )['descripcion'],
        codModeloDescripcion: selectByKey(
          modelsBinded,
          vehicle,
          'codModelo',
          'codModelo'
        )['descripcion'],
        codConfiguracionDescripcion: selectByKey(
          confsBinded,
          vehicle,
          'codConfi',
          'codConfiguracion'
        )['descripcion']
      };
    };

    vehiclesWithDescriptions = rMap(
      addDescriptionTo.bind(
        null,
        _vehicleTypes,
        _vehicleBrands,
        _vehicleModels,
        _vehicleConfigurations
      ),
      _vehicles
    );
    return dispatch({
      type: ADD_DESCRIPTIONS_TO_VEHICLES,
      vehiclesView: vehiclesWithDescriptions
    });
  }
  return 'hi';
};
