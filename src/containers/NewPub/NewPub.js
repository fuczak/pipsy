import React, { Component } from 'react';
import { PubForm } from 'components';

export default class NewPub extends Component {
  handleFormSubmit(ev) {
    const pubData = {
      name: ev.name,
      addressStreet: ev.addressStreet,
      addressNumber: ev.addressNumber,
      openingHours: {
        Mon: [ev.oMon, ev.cMon],
        Tue: [ev.oTue, ev.cTue],
        Wed: [ev.oWed, ev.cWed],
        Thu: [ev.oThu, ev.cThu],
        Fri: [ev.oFri, ev.cFri],
        Sat: [ev.oSat, ev.cSat],
        Sun: [ev.oSun, ev.cSun]
      }
    };
    console.log(pubData);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <h1>Please fill all the fields below</h1>
          <PubForm onSubmit={::this.handleFormSubmit}/>
        </div>
      </div>
    );
  }
}
