import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = [
  'name',
  'addressStreet',
  'addressNumber',
  'oMon',
  'cMon',
  'oTue',
  'cTue',
  'oWed',
  'cWed',
  'oThu',
  'cThu',
  'oFri',
  'cFri',
  'oSat',
  'cSat',
  'oSun',
  'cSun',
  'lat',
  'lon'
];

class PubForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired
  };

  render() {
    const {
      fields: {name, addressStreet, addressNumber, oMon, cMon, oTue, cTue, oWed, cWed, oThu, cThu, oFri, cFri, oSat, cSat, oSun, cSun, lat, lon} // eslint-disable-line
    } = this.props;
    return (
      <form className="form-horizontal" onSubmit={null}>
        <div className="form-group">
          <label className="col-md-2 control-label" htmlFor="name">Name</label>
          <div className="col-md-10">
            <input className="form-control" type="text" id="name" placeholder="Pub name... " {...name} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-2 control-label" htmlFor="street">Street Name</label>
          <div className="col-md-6">
            <input className="form-control" type="text" id="street" placeholder="Pub street name... " {...addressStreet} />
          </div>
          <label className="col-md-2 control-label" htmlFor="number">Street Number</label>
          <div className="col-md-2">
            <input className="form-control" type="number" id="number" placeholder="Pub street number... " {...addressNumber} />
          </div>
        </div>
      </form>
    );
  }
}

PubForm = reduxForm({
  form: 'pub',
  fields
})(PubForm);

export default PubForm;
