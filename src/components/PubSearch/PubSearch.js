import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';

export default class PubSearch extends Component {
  static propTypes = {
    onInputChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <input className="form-control" type="text" onChange={debounce(this.props.onInputChange, 400)} />
      </div>
    );
  }
}
