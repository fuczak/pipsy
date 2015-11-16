import React from 'react';

/* eslint-disable */
const BusinessHours = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.dayName} className="col-md-1 control-label">{props.dayName}</label>
      <div className="col-md-5">
        <input type="number" id={'o' + props.dayName} className="form-control" {...props.openingField} />
      </div>
      <div className="col-md-1">
        :
      </div>
      <div className="col-md-5">
        <input type="number" id={'c' + props.dayName} className="form-control" {...props.closingField} />
      </div>
    </div>
  );
};
/* eslint-enable */

export default BusinessHours;
