/* eslint-disable no-console */

import { LitElement, property, customElement, html } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { SharedStyles } from '../shared-styles';
import { store } from '../../store';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
@customElement('vehicles-search-element')
export class VehiclesSearchElement extends connect(store)(LitElement) {
  @property({ type: String })
  private codModeloFilter = '';
  @property({ type: String })
  private codTipoFilter = '';
  @property({ type: String })
  private codPlacaFilter = '';
  @property({ type: String })
  private codMarcaFilter = '';
  @property({ type: String })
  private codConfiguracionFilter = '';
  @property({ type: String })
  private codVehiculoFilter = '';
  @property({ type: Array })
  private _vehicles = [];
  @property({ type: Array })
  private _vehicleBrands = [];
  @property({ type: Array })
  private _vehicleModels = [];
  @property({ type: Array })
  private _vehicleTypes = [];
  @property({ type: Array })
  private _vehicleConfigurations = [];
  @property({ type: Array })
  private _vehiclesView = [];

  constructor() {
    super();
    /* filters*/
    this.codModeloFilter = '';
    this.codTipoFilter = '';
    this.codPlacaFilter = '';
    this.codMarcaFilter = '';
    this.codConfiguracionFilter = '';
    this.codVehiculoFilter = '';
    /* ENDfilters*/
  }

  static get styles() {
    return [SharedStyles];
  }

  stateChanged(state: any) {
    this._vehicles = state.vehicles.vehicles.vehiculo;
    this._vehiclesView = state.views.vehiclesView;
    this._vehicleBrands = state.vehicles.vehicleBrands.marcaVehiculo;
    this._vehicleTypes = state.vehicles.vehicleTypes.tipoVehiculo;
    this._vehicleModels = state.vehicles.vehicleModels.modeloVehiculo;
    this._vehicleConfigurations =
      state.vehicles.vehicleConfigurations.configuracion;
  }

  render() {
    return html`
      <section>
        <h1>Historial de Vehiculos</h1>
      </section>

      <section>
        <vaadin-combo-box
          label="Vehiculo"
          .items=${this._vehicles}
          @selected-item-changed="${(e: {
            detail: {
              value: {
                codVehiculo: {
                  replace: (arg0: RegExp, arg1: string) => string;
                };
              } | null;
            };
          }) =>
            e.detail.value != null
              ? (this.codVehiculoFilter = e.detail.value.codVehiculo.replace(
                  /\s/g,
                  ''
                ))
              : (this.codVehiculoFilter = '')}"
          @change="${(e: any) => console.log(e)}"
          item-label-path="codVehiculo"
          item-value-path="codVehiculo"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Marca de Vehiculo"
          .items=${this._vehicleBrands}
          @selected-item-changed="${(e: {
            detail: { value: { codMarca: string } | null };
          }) =>
            e.detail.value != null
              ? (this.codMarcaFilter = e.detail.value.codMarca)
              : (this.codMarcaFilter = '')}"
          @change="${(e: any) => console.log(e)}"
          item-label-path="descripcion"
          item-value-path="codMarca"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Modelo de Vehiculo"
          .items=${this._vehicleModels}
          @selected-item-changed="${(e: {
            detail: { value: { codModelo: string } | null };
          }) =>
            e.detail.value != null
              ? (this.codModeloFilter = e.detail.value.codModelo)
              : (this.codModeloFilter = '')}"
          @change="${(e: any) => console.log(e)}"
          item-label-path="descripcion"
          item-value-path="codModelo"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Tipo de Vehiculo"
          .items=${this._vehicleTypes}
          @selected-item-changed="${(e: {
            detail: { value: { codTipo: string } | null };
          }) =>
            e.detail.value != null
              ? (this.codTipoFilter = e.detail.value.codTipo)
              : (this.codTipoFilter = '')}"
          @change="${(e: any) => console.log(e)}"
          item-label-path="descripcion"
          item-value-path="codTipo"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Placa de Vehiculo"
          .items=${this._vehicles}
          @selected-item-changed="${(e: {
            detail: { value: { placa: string } | null };
          }) =>
            e.detail.value != null
              ? (this.codPlacaFilter = e.detail.value.placa)
              : (this.codPlacaFilter = '')}"
          @change="${(e: any) => console.log(e)}"
          item-label-path="placa"
          item-value-path="placa"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Configuracion de Vehiculo"
          .items=${this._vehicleConfigurations}
          @selected-item-changed="${(e: {
            detail: { value: { codConfi: string } | null };
          }) =>
            e.detail.value != null
              ? (this.codConfiguracionFilter = e.detail.value.codConfi)
              : (this.codConfiguracionFilter = '')}"
          @change="${(e: any) => console.log(e)}"
          item-label-path="descripcion"
          item-value-path="codConfi"
          value=""
        >
        </vaadin-combo-box>
      </section>
      <div id="container">
        <vaadin-grid
          theme="row-stripes"
          column-reordering-allowed
          multi-sort
          .items=${this._vehiclesView}
        >
          <vaadin-grid-selection-column
            auto-select
            frozen
          ></vaadin-grid-selection-column>
          <vaadin-grid-sort-column
            resizable
            width="9em"
            path="codVehiculo"
            header="Neumatico"
          >
            <vaadin-grid-filter
              path="codVehiculo"
              value="${this.codVehiculoFilter}"
            ></vaadin-grid-filter>
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column
            resizable
            width="9em"
            path="codMarcaDescripcion"
            header="Marca de Vehiculo"
          >
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column
            resizable
            width="9em"
            path="codMarca"
            header="Marca"
          >
            <vaadin-grid-filter
              path="codMarca"
              value=${this.codMarcaFilter}
            ></vaadin-grid-filter>
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column
            resizable
            width="9em"
            path="codModeloDescripcion"
            flex-grow="2"
            header="Modelo de Vehiculo"
          >
          </vaadin-grid-sort-column>
          <vaadin-grid-sort-column
            resizable
            width="9em"
            path="codModelo"
            flex-grow="2"
            header="Modelo"
          >
            <vaadin-grid-filter
              path="codModelo"
              value=${this.codModeloFilter}
            ></vaadin-grid-filter>
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column
            width="9em"
            path="codTipoDescripcion"
            header="Tipo de Vehiculo"
          >
          </vaadin-grid-sort-column>
          <vaadin-grid-sort-column
            width="9em"
            path="codTipo"
            header="Tipo"
          >
            <vaadin-grid-filter
              path="codTipo"
              value=${this.codTipoFilter}
            ></vaadin-grid-filter>
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column
            width="9em"
            path="placa"
            header="Placa de Vehiculo"
          >
            <vaadin-grid-filter
              path="placa"
              value=${this.codPlacaFilter}
            ></vaadin-grid-filter>
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column
            width="9em"
            path="codConfiguracionDescripcion"
            header="Configuracion de Vehiculo"
          >
          </vaadin-grid-sort-column>
          <vaadin-grid-sort-column
            width="9em"
            path="codConfiguracion"
            header="Configuracion"
          >
            <vaadin-grid-filter
              path="codConfiguracion"
              value=${this.codConfiguracionFilter}
            ></vaadin-grid-filter>
          </vaadin-grid-sort-column>
        </vaadin-grid>
      </div>
      <style>
        #container {
          padding: 1.5em;
        }
      </style>
    `;
  }
}
