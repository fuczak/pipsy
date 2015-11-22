import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import BusinessHours from './BusinessHours';
import { PubMap } from 'components';
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
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const {
      fields: {name, addressStreet, addressNumber, oMon, cMon, oTue, cTue, oWed, cWed, oThu, cThu, oFri, cFri, oSat, cSat, oSun, cSun, lat, lon}, // eslint-disable-line
      handleSubmit
    } = this.props;
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <h2>Basic Info</h2>
            <hr />
            <div className="form-group">
              <label className="col-md-1 control-label" htmlFor="name">Name</label>
              <div className="col-md-11">
                <input className="form-control" type="text" id="name" placeholder="Pub name... " {...name} />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-1 control-label" htmlFor="street">Street Name</label>
              <div className="col-md-6">
                <input className="form-control" type="text" id="street" placeholder="Pub street name... " {...addressStreet} />
              </div>
              <label className="col-md-1 control-label" htmlFor="number">Street Number</label>
              <div className="col-md-4">
                <input className="form-control" type="number" id="number" placeholder="Pub street number... " {...addressNumber} />
              </div>
            </div>
            <div className="form-group">
              <PubMap street="Miodowa" number={24} />
            </div>
          </div>
          <div className="col-md-4">
            <h2>Opening hours</h2>
            <hr />
            <BusinessHours dayName="Mon" openingField={oMon} closingField={cMon} />
            <BusinessHours dayName="Tue" openingField={oTue} closingField={cTue} />
            <BusinessHours dayName="Wed" openingField={oWed} closingField={cWed} />
            <BusinessHours dayName="Thu" openingField={oThu} closingField={cThu} />
            <BusinessHours dayName="Fri" openingField={oFri} closingField={cFri} />
            <BusinessHours dayName="Sat" openingField={oSat} closingField={cSat} />
            <BusinessHours dayName="Sun" openingField={oSun} closingField={cSun} />
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
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
