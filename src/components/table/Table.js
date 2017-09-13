import React, { PureComponent } from 'react';
import ReactDOMServer from 'react-dom/server';

import Handsontable from 'handsontable';
import _debounce from 'lodash/debounce';

import ProgressRenderer from '../ProgressRenderer';
import Slider from '../RangeSliderCell';

import 'handsontable/src/css/handsontable.css';
import 'handsontable/src/css/bootstrap.css';
import expandIcon from '../../expand.svg';
import sortIcon from '../../sort.svg';

const enhancerRenderer = (Component) => {
  return (instance, td, row, col, prop, value, cellProperties) => {
    td.innerHTML = ReactDOMServer.renderToString(React.createFactory(Component)({
      instance,
      td,
      row,
      col,
      prop,
      value,
      cellProperties,
    }));
    return td;
  }
};

const TABLE_SETTINGS = {
  stretchH: 'all',
  autoWrapRow: true,
  colHeaders:[
    `<div>Select <img class="expand-icon" src=${expandIcon}></div>`,
    'Column1',
    `<div>Progress Bar <img class="sort-icon" src=${sortIcon}></div>`,
    'Range Slider',
  ],
  fixedRowsTop: 1,
  mergeCells: [{
    row: 0,
    col: 0,
    rowspan: 1,
    colspan: 2
  }, {
    row: 0,
    col: 2,
    rowspan: 1,
    colspan: 2,
  }],
  columns: [
    {
        data: 'id',
        type: 'checkbox',
        width: 20
    },
    {
        data: 'column1',
        type: 'numeric',
        width: 40,
        readOnly: true
    },
    {
        data: 'progress',
        type: 'numeric',
        width: 80,
        readOnly: true,
        renderer: enhancerRenderer(ProgressRenderer)
    },
    {
        data: 'range',
        type: 'numeric',
        width: 80,
        readOnly: true,
        renderer: enhancerRenderer(Slider)
    }
  ]
};

class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.debouncedScroll = _debounce(this.onScroll, 300);
  }

  componentDidMount() {
    this.hotTable = new Handsontable(this.refs.tableContainer, Object.assign({
      data: [],
      height: window.innerHeight - 116
    }, TABLE_SETTINGS));
    window.addEventListener("resize", this.updateDimensions);
  }

  componentDidUpdate() {
    this.hotTable.loadData([
      {},
      ...this.props.data,
    ]);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.hotTable.updateSettings({
      height: window.innerHeight - 116,
    });
  }

  onScroll = () => {
    if( this.props.fetching) {
      return;
    }
    const scrollContainer = this.hotTable.container.children[0];
    if(scrollContainer.scrollTop + scrollContainer.offsetHeight > (scrollContainer.scrollHeight - 100)) {
      this.props.fetchMore();
    }
  }

  render() {
    return (
      <div ref="tableContainer" onScroll={this.debouncedScroll}></div>
    );
  }
}

export default Table;
