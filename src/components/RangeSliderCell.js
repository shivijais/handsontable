import React from 'react';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

class Slider extends React.PureComponent {

  onSliderChange = (value, a) => {
    console.log(value, a);
  }

  render() {
    debugger;
    const range = this.props.value || [20, 40];
    return (
        <div className="slider-wrapper">
          <Range
            allowCross={false}
            defaultValue={range}
            onChange={this.onSliderChange}
            min={0}
            max={100}
          />
        </div>
      );
  }
}

Slider.defaultProps = {
  value: [20, 40],
};

export default Slider;
