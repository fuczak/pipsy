import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pubsActions from 'redux/modules/pubs';
import { PubForm } from 'components';

@connect(
  () => ({}),
  (dispatch) => (
    bindActionCreators(pubsActions, dispatch)
  )
)
export default class NewPub extends Component {
  static propTypes = {
    postPub: PropTypes.func.isRequired
  }

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
    this.props.postPub(pubData);
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
