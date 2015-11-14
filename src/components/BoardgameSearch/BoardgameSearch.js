import React, { Component, PropTypes } from 'react';

export default class BoardgameSearch extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    onSelectEndpoint: PropTypes.func,
    selectedEndpoint: PropTypes.string,
    availableEndpoints: PropTypes.array
  }

  handleClick() {
    this.props.load(this.input.value, this.props.selectedEndpoint);
  }

  handleKeyUp(ev) {
    if (ev.keyCode === 13) this.handleClick();
  }

  handleEndpointChange(ev) {
    this.props.onSelectEndpoint(ev.target.value);
  }

  render() {
    const {selectedEndpoint, availableEndpoints} = this.props;
    return (
      <div>
        <select className="form-control" defaultValue={selectedEndpoint} onChange={::this.handleEndpointChange}>
          {availableEndpoints.map((endpoint) => {
            return <option key={endpoint} value={endpoint}>{endpoint}</option>;
          })}
        </select>
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
      </div>
    );
  }
}
