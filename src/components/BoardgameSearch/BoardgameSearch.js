import React, { Component, PropTypes } from 'react';

export default class BoardgameSearch extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired
  }

  handleClick() {
    this.props.load(this.input.value, 'DB');
  }

  handleKeyUp(ev) {
    if (ev.keyCode === 13) this.handleClick();
  }

  render() {
    return (
      <div className="input-group">
        <input type="text"
          className="form-control"
          placeholder="Wpisz nazwę planszówki..."
          ref={(node) => this.input = node}
          onKeyUp={::this.handleKeyUp} />
        <span className="input-group-btn">
          <button className="btn btn-primary" type="button" onClick={::this.handleClick}>Wyszukaj</button>
        </span>
      </div>
    );
  }
}
