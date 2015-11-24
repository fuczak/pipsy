import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pubsActions from 'redux/modules/pubs';
// import { PubForm } from 'components';
import { PubSearch } from 'components';

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

  handleFormSubmit = (pubObject) => {
    this.props.postPub(pubObject);
  }

  handleSearchChange = (ev) => {
    console.log(ev.target.value);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <h1>Please fill all the fields below</h1>
          {/* <PubForm onSubmit={this.handleFormSubmit}/> */}
          <PubSearch onInputChange={this.handleSearchChange}/>
        </div>
      </div>
    );
  }
}
