import { LitElement, property, customElement, html } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { SharedStyles } from '../shared-styles';
import historyClass from './historyClass';
import { store } from '../../store';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
@customElement('tires-search-element')
export class TiresSearchElement extends connect(store)(LitElement) {
  @property({ type: String })
  private codModeloFilter = '';
  @property({ type: String })
  private codMedidaFilter = '';
  @property({ type: String })
  private codDisenoFilter = '';
  @property({ type: String })
  private codMarcaFilter = '';
  @property({ type: String })
  private codNeumaticoFilter = '';

  @property({ type: String })
  private fetchURL = `https://azaryah.sdyalor.me/api/graphql`;
  @property({ type: Object })
  private history = {};
  @property({ type: Array })
  private code0000710 = {};
  @property({ type: Array })
  private _tires = [];
  @property({ type: Array })
  private _tireBrands = [];
  @property({ type: Array })
  private _tireModels = [];
  @property({ type: Array })
  private _tireMeasures = [];
  @property({ type: Array })
  private _tireDesigns = [];
  @property({ type: Array })
  private _tireConditions = [];
  @property({ type: Array })
  private _tiresView = [];
  @property({ type: Promise })
  private fetchNeumaticosDetBy = fetch(`${this.fetchURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `
        query {
        snNeumaticosDetsById(id:"0000710"){
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
    .then(data => (this.code0000710 = data.data.snNeumaticosDetsById));

  static get styles() {
    return [SharedStyles];
  }

  historyClassCall() {
    this.history = new historyClass(this.code0000710);
    //@ts-ignore
    console.log(this.history.instalationRemnantObj);
    //@ts-ignore
    console.log(this.history.lastInspectionWhereCondicionNU);
  }
  stateChanged(state: any) {
    this._tires = state.tires.tires.neumaticos;
    this._tiresView = state.views.tiresView;
    this._tireBrands = state.tires.tireBrands.marcaNeumatico;
    this._tireModels = state.tires.tireModels.modeloNeumatico;
    this._tireDesigns = state.tires.tireDesigns.disenosNeumatico;
    this._tireMeasures = state.tires.tireMeasures.medidaNeumatico;
  }

  render() {
    return html`
      <!-- Neumaticos fromTires -->
      <section>
        <h1>Historial de Neumaticos</h1>
      </section>
      <!--End Condicion de Neumaticos fromTires -->
      <section>
        <vaadin-combo-box
          label="Neumaticos"
          .items=${this._tires}
          @selected-item-changed="${(e: {
            detail: { value: { codNeumatico: string } | null };
          }) =>
            e.detail.value != null
              ? (this.codNeumaticoFilter = e.detail.value.codNeumatico)
              : (this.codNeumaticoFilter = '')}"
          @change="${(e: any) => console.log(e)}"
          item-label-path="codNeumatico"
          item-value-path="codNeumatico"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Marca de Neumatico"
          .items=${this._tireBrands}
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
          label="Modelo de Neumatico"
          .items=${this._tireModels}
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
          label="Medida de Neumatico"
          .items=${this._tireMeasures}
          @selected-item-changed="${(e: {
            detail: { value: { codMedida: string } | null };
          }) =>
            e.detail.value != null
              ? (this.codMedidaFilter = e.detail.value.codMedida)
              : (this.codMedidaFilter = '')}"
          @change="${(e: any) => console.log(e)}"
          item-label-path="descripcion"
          item-value-path="codMedida"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Diseno de Neumatico"
          .items=${this._tireDesigns}
          @selected-item-changed="${(e: {
            detail: { value: { codDiseno: string } | null };
          }) =>
            e.detail.value != null
              ? (this.codDisenoFilter = e.detail.value.codDiseno)
              : (this.codDisenoFilter = '')}"
          @change="${(e: any) => console.log(e)}"
          item-label-path="descripcion"
          item-value-path="codDiseno"
          value=""
        >
        </vaadin-combo-box>
      </section>
      <div id="container">
        <vaadin-grid
          theme="row-stripes"
          column-reordering-allowed
          multi-sort
          .items=${this._tiresView}
        >
          <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
          <vaadin-grid-sort-column resizable width="9rem" path="codNeumatico" header="Neumatico">
            <vaadin-grid-filter
              path="codNeumatico"
              value=${this.codNeumaticoFilter}
            ></vaadin-grid-filter>
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column
            width="9rem"
            path="codMarcaDescripcion"
            header="Marca de Neumatico"
          >
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column path="codMarca" header="Marca">
            <vaadin-grid-filter path="codMarca" value=${
              this.codMarcaFilter
            }></vaadin-grid-filter>
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column
            width="9rem"
            path="codModeloDescripcion"
            header="Modelo de Neumatico"
          >
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column
            path="codModelo"
            header="Modelo"
          >
            <vaadin-grid-filter path="codModelo" value=${
              this.codModeloFilter
            }></vaadin-grid-filter>
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column
            width="9rem"
            path="codMedidaDescripcion"
            header="Medida de Neumatico"
          >
          </vaadin-grid-sort-column>
          <vaadin-grid-sort-column path="codMedida" header="Medida">
            <vaadin-grid-filter path="codMedida" value=${
              this.codMedidaFilter
            }></vaadin-grid-filter>
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column path="codDisenoDescripcion" header="Diseno de Neumatico">
          <vaadin-grid-sort-column path="codDiseno" header="Diseno">
            <vaadin-grid-filter path="codDiseno" value=${
              this.codDisenoFilter
            }></vaadin-grid-filter>
          </vaadin-grid-sort-column>
          <vaadin-grid-sort-column
            width="9rem"
            path="estado"
            header="Estado de Neumatico"
          ></vaadin-grid-sort-column>
          <vaadin-grid-sort-column
            width="9rem"
            path="codProveedor"
            header="Proveedor de Neumatico"
          ></vaadin-grid-sort-column>
        </vaadin-grid>
      </div>
      <style>
        #container {
          padding: 1.5em;
        }
      </style>
      <button @click=${this.historyClassCall}></button>
    `;
  }
}
