import React from 'react';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

const Slider = (instance, td, row, col, prop, value, cellProperties) => {
  return (
    <div className="slider-wrapper">
      <Range allowCross={false} value={[20, 40]}/>
    </div>
  );
};

export default Slider;
