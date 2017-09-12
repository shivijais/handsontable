import React, { PureComponent } from 'react';
import ReactDOMServer from 'react-dom/server';

import Handsontable from 'handsontable';

import ProgressRenderer from '../ProgressRenderer';
import Slider from '../RangeSliderCell';

import 'handsontable/src/css/handsontable.css';
import 'handsontable/src/css/bootstrap.css';

const enhancerRenderer = (func) => {
  return (...args) => {
    args[1].innerHTML = ReactDOMServer.renderToString(func.apply(null, args))
    return args[1]
  }
};

const TABLE_SETTINGS = {
  stretchH: 'all',
  autoWrapRow: true,
  colHeaders:[
    'Select',
    'Column1',
    'Progress Bar',
    'Range Slider',
  ],
  fixedRowsTop: 1,
  mergeCells: [{
    row:0,
    col:0,
    rowspan:1,
    colspan:4
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
  componentDidMount() {
    debugger;
    this.hotTable = new Handsontable(this.refs['table-container'], Object.assign({
      data: [
        {},
        ...this.props.data,
        {}
      ],
      height: window.innerHeight - 94
    }, TABLE_SETTINGS));
  }

  componentDidUpdate() {
    this.hotTable.loadData(this.props.data);
  }

  render() {
    return (
      <div ref="table-container"></div>
    );
  }
}

export default Table;
