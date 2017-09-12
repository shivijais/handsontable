import React from 'react';

const numFormatObject = (number) => {
        var formatObject,
          getObj = function(num, abbr) {
            return {
              value: num,
              abbr: abbr
            };
          };

        if(number >= 1000000000) {
          formatObject = getObj(1000000000, 'B');
        } else if(number >= 1000000) {
          formatObject = getObj(1000000, 'M');
        } else if(number >= 1000) {
          formatObject = getObj(1000, 'K');
        }
        return formatObject;
      };

const targetVal = 2000000;

const ProgressRenderer = ({instance, td, row, col, prop, value, cellProperties}) => {
  if( row === 0 ) return (<div className="static-header-row"> Static Header Rows </div>);
  const formatObj = numFormatObject(value);
  const formattedValue = ( value / formatObj.value).toFixed(2).replace(/\.0$/, '') + formatObj.abbr;
  const progress = (+value/targetVal*100).toFixed(0);
  return (
    <div className="progress-wrapper">
      <div className="progress" style={{
        width: `${progress}%`
      }}>
        <span className="progress-value">
          {`$${formattedValue}`}
        </span>
      </div>
    </div>
  );
}

ProgressRenderer.defaultProps = {
  value: 1.24
}

export default ProgressRenderer
