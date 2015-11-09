import React, { Component, PropTypes } from 'react';

export default class BoardgameSearch extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired
  }

  handleClick() {
    this.props.load(this.refs.searchbox.value);
  }

  handleKeyUp(ev) {
    if (ev.keyCode === 13) this.handleClick();
  }

  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Wpisz nazwę planszówki..." ref="searchbox" onKeyUp={(ev) => this.handleKeyUp(ev)}/>
        <span className="input-group-btn">
          <button className="btn btn-primary" type="button" onClick={::this.handleClick}>Szukaj</button>
        </span>
      </div>
    );
  }
}
