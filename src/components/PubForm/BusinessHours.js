import React, { Component, PropTypes } from 'react';


export default class BusinessHours extends Component {
  static propTypes = {
    dayName: PropTypes.string.isRequired
  }
  render() {
    return (
      <div className="form-group">
        <label htmlFor={'o' + this.props.dayName} className="col-md-3 control-label">{this.props.dayName}</label>
        <div className="col-md-4">
          <input type="number" id={'o' + this.props.dayName} className="form-control" defaultValue={8} ref={(ref) => this.opening = ref} />
        </div>
        <div className="col-md-1">
          :
        </div>
        <div className="col-md-4">
          <input type="number" id={'c' + this.props.dayName} className="form-control" defaultValue={24} ref={(ref) => this.closing = ref} />
        </div>
      </div>
    );
  }
}
