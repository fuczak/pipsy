import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pubsActions from 'redux/modules/pubs';
import { PubForm } from 'components';
import schemaConverter from '../../helpers/formToPubSchema';

const initialPub = {
  oMon: 8, cMon: 24,
  oTue: 8, cTue: 24,
  oWed: 8, cWed: 24,
  oThu: 8, cThu: 24,
  oFri: 8, cFri: 24,
  oSat: 8, cSat: 24,
  oSun: 8, cSun: 24
};

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

  handleFormSubmit = (ev) => {
    const pubData = schemaConverter(ev);
    this.props.postPub(pubData);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <h1>Please fill all the fields below</h1>
          <PubForm initialValues={initialPub} onSubmit={this.handleFormSubmit}/>
        </div>
      </div>
    );
  }
}
