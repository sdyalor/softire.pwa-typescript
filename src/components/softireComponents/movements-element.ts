/* eslint-disable no-console */
import {
  LitElement,
  property,
  customElement,
  html,
  css
} from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { SharedStyles } from '../shared-styles';
import { store } from '../../store';
import { connect } from 'pwa-helpers/connect-mixin.js';
import historyClass from './historyClass';
import * as R from 'ramda';
import {
  addDescriptionsToTires,
  addDescriptionsToVehicles
} from '../../actions/viewsActions';
//@ts-ignore
import jexcel from 'jexcel';
import 'jsuites/dist/jsuites.js';
import * as jsuitescss from 'jsuites/dist/jsuites.css';
import * as jexcelcss from 'jexcel/dist/jexcel.css';

@customElement('movements-element')
export class MovementsElement extends connect(store)(LitElement) {
  fetchDetById(id: any) {
    const fetchURL = `https://azaryah.sdyalor.me/api/graphql`;
    return fetch(fetchURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `
        query {
        snNeumaticosDetsById(id:"${id}"){
                nroCia
                codNeumatico
                fechaMov
                codCondicion
                ubicacion
                codEvento
                remanenteProm
                posicion
                codDiseno
                kilometraje
                horometro
                presion
                codProveedor
                costo
            }
        }
        `
      })
    })
      .then(r => r.json())
      .then(r => r.data);
  }

  @property({ type: Array })
  private codeTest = [];
  @property({ type: String })
  private inputValue = 'code value here';
  @property({ type: Array })
  private _tireBrands = [];
  @property({ type: Array })
  private _tires = [];

  private history = {};
  private tireBrands: Array<any> = [];
  private neumaticosView: any = [];
  private data = [
    ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
    ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777']
  ];

  static get styles() {
    return [
      SharedStyles,
      css`
        ${jexcelcss}
      `,
      css`
        ${jsuitescss}
      `
    ];
  }

  async fetchNeumaticosDetBy(id: any) {
    return await this.fetchDetById(id).then(
      NeumaticosDetArray =>
        (this.codeTest = NeumaticosDetArray.snNeumaticosDetsById)
    );
  }
  async historyClassCall() {
    console.log(this.inputValue);
    //@ts-ignore
    console.log(await this.fetchNeumaticosDetBy(this.inputEl.value));
    console.log('test begin');
    console.log(this.codeTest);

    console.log('new classs here');
    this.history = new historyClass(this.codeTest);
    console.log('get History here here');
    //@ts-ignore
    console.log(this.history.getHistory);
    console.log('this is input value');
    console.log(this.inputValue);
    //    console.log(this.shadowRoot);
    //console.log(this.history.instalationRemnantObj);
    //console.log(this.history.lastInspectionWhereCondicionNU);
  }

  toAddDescripcion(neumatico: any) {
    function addProps(neumaticoObj: any, state: any) {
      const selectBrandsFrom = R.compose(
        R.prop('tireBrands'),
        //@ts-ignore
        R.prop('tires')
      );
      const findBrand = R.find(
        R.propEq('codMarca', neumaticoObj['codMarca'])
      );
      const getBrandDescripcion = R.prop('Descripcion');
      // const a = { codMarcaDescripcion: 'state' };
      return R.compose(
        getBrandDescripcion,
        findBrand,
        selectBrandsFrom
        //@ts-ignore
      )(state);
    }
    return { ...neumatico, ...addProps(neumatico, store.getState()) };
    // return getBrandDescripcion(findBrand(selectBrandsFrom(state)))
  }
  toAddDescripcions(othis: any, tire: any) {
    // R.find()
    const wrapper = othis._tireBrands;

    const callback = (fthis: any, brand: any) =>
      brand['codMarca'] == fthis['codMarca'];

    const OBrand = R.find(callback.bind(null, tire))(wrapper);
    // return { ...tire, added: wrapper };
    return { ...tire, codMarcaDescripcion: OBrand['descripcion'] };
  }

  stateChanged(state: any) {
    this._tires = state.tires.tires.neumaticos;
    this._tireBrands = state.tires.tireBrands.marcaNeumatico;
    if (state.tires.tires.neumaticos) {
      console.log('state looks with tires');
    }
    if (state.tires.tireConditions.condicionesNeumatico) {
      console.log('state looks with conditions');
    }
    if (
      state.tires.tires.neumaticos &&
      state.tires.tireConditions.condicionesNeumatico
    ) {
      this.neumaticosView = R.map(
        this.toAddDescripcions.bind(null, this),
        this._tires
      );
    }
    if (
      state.tires.tireBrands.marcaNeumatico &&
      state.tires.tireModels.modeloNeumatico &&
      state.tires.tireMeasures.medidaNeumatico &&
      state.tires.tireDesigns.disenosNeumatico &&
      state.tires.tires.neumaticos &&
      state.views.tiresView < 1
    ) {
      console.log('all tires ok!!!!!');
      store.dispatch(addDescriptionsToTires());
    }
    if (
      state.vehicles.vehicles.vehiculo &&
      state.vehicles.vehicleBrands.marcaVehiculo &&
      state.vehicles.vehicleTypes.tipoVehiculo &&
      state.vehicles.vehicleModels.modeloVehiculo &&
      state.vehicles.vehicleConfigurations.configuracion &&
      state.views.vehiclesView < 1
    ) {
      console.log('all vehicles ok!!!!!');
      store.dispatch(addDescriptionsToVehicles());
    }
  }
  get inputEl() {
    //@ts-ignore
    return this.shadowRoot.getElementById('inputID');
  }
  firstUpdated() {
    console.log('updated first');
    //@ts-ignore
    jexcel(this.shadowRoot.getElementById('jexcel'), {
      data: this.data,
      columns: [
        { type: 'text', title: 'Car', width: 120 },
        {
          type: 'dropdown',
          title: 'Make',
          width: 200,
          source: ['Alfa Romeo', 'Audi', 'Bmw']
        },
        { type: 'calendar', title: 'Available', width: 200 },
        { type: 'image', title: 'Photo', width: 120 },
        { type: 'checkbox', title: 'Stock', width: 80 },
        {
          type: 'numeric',
          title: 'Price',
          width: 100,
          mask: '$ #.##,00',
          decimal: ','
        },
        { type: 'color', width: 100, render: 'square' }
      ]
    });
  }
  render() {
    //@ts-ignore
    return html`
      <section>
        <h1>Historial de Vehiculos</h1>
      </section>
      <input id=inputID 
      value=${this.inputValue} 
      @change="${(e: { srcElement: { value: any } }) =>
        console.log(e.srcElement.value)}" 
      @keydown="${(e: any) => console.log(e)}"
      >
      <button @click="${this.historyClassCall}" >Hellow</button>
      <div>hixdaaxdx</div>

      <section>
      </div>
      <style>
        #container {
          padding: 1.5em;
        }
      </style>
      <button @click="${() =>
        console.log(this.neumaticosView)}" >getState</button>
      <button @click="${() =>
        console.log(this._tireBrands)}" > log brands </button>
      <button @click="${() =>
        store.dispatch(
          addDescriptionsToTires()
        )}" > dispatch store </button>
      <button @click="${() =>
        store.dispatch(
          addDescriptionsToVehicles()
        )}" > dispatch store </button>
      
      <div id='jexcel'></div>
    `;
  }
}
