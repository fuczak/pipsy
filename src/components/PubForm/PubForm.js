import React, { Component, PropTypes } from 'react';
import BusinessHours from './BusinessHours';
import { PubMap } from 'components';
import getPosition from '../../helpers/getPosition';

export default class PubForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.form = {};
    this.weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  }

  state = {
    lat: 50.05,
    lng: 19.94
  }

  getNewGeoposition = () => {
    getPosition(this.form.addressStreet.value, this.form.addressNumber.value)
      .then((data) => {
        if (data !== undefined) {
          this.setState({
            lat: data.lat,
            lng: data.lng
          });
        }
      });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const form = this.form;
    const pubObject = {
      name: form.name.value,
      address: {
        street: form.addressStreet.value,
        number: Number(form.addressNumber.value),
        lat: this.state.lat,
        lng: this.state.lng
      },
      openingHours: {}
    };
    this.weekdays.forEach((day) => {
      pubObject.openingHours[day] = [Number(form[day].opening.value), Number(form[day].closing.value)];
    });
    this.props.onSubmit(pubObject);
  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <h2>Basic Info</h2>
            <hr />
            <div className="form-group">
              <label className="col-md-1 control-label" htmlFor="name">Name</label>
              <div className="col-md-11">
                <input className="form-control" type="text" id="name" placeholder="Pub name... "
                  ref={(ref) => this.form.name = ref}/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-1 control-label" htmlFor="street">Street Name</label>
              <div className="col-md-6">
                <input className="form-control" type="text" id="street" placeholder="Pub street name... "
                  ref={(ref) => this.form.addressStreet = ref}
                  onChange={this.getNewGeoposition}/>
              </div>
              <label className="col-md-1 control-label" htmlFor="number">Street Number</label>
              <div className="col-md-4">
                <input className="form-control" type="number" id="number" placeholder="Pub street number... "
                  ref={(ref) => this.form.addressNumber = ref}
                  onChange={this.getNewGeoposition}/>
              </div>
            </div>
            <div className="form-group">
              <PubMap lat={this.state.lat} lng={this.state.lng} />
            </div>
          </div>
          <div className="col-md-4">
            <h2>Opening hours</h2>
            {this.weekdays.map((el, index) => {
              return <BusinessHours key={index} dayName={el} ref={(ref) => this.form[el] = ref} />;
            })}
            <hr />
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
        </div>
      </form>
    );
  }
}
