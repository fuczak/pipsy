import React, { Component } from 'react';
import { PubForm } from 'components';

export default class NewPub extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <h1>Please fill all the fields below</h1>
          <PubForm />
        </div>
      </div>
    );
  }
}
