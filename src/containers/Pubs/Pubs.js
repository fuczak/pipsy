import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as pubsActions from 'redux/modules/pubs';

@connect(
  state => ({
    availablePubs: state.pubs.availablePubs,
    selectedPub: state.pubs.selectedPub
  }),
  pubsActions
)
export default class Pubs extends Component {
  static propTypes = {
    availablePubs: PropTypes.array,
    selectedPub: PropTypes.object,
    getPubs: PropTypes.func,
    setSelectedPub: PropTypes.func
  }

  componentDidMount() {
    if (this.props.availablePubs.length === 0) this.props.getPubs();
  }

  handleSelectedPubChange(ev) {
    this.props.setSelectedPub(ev.target.selectedIndex);
  }

  handleSubmitButtonClick() {
    const selectedPub = this.props.selectedPub;
    console.log(selectedPub);
  }

  render() {
    return (
      <div>
        <select className="form-control" defaultValue={this.props.availablePubs[0]} onChange={::this.handleSelectedPubChange}>
          {this.props.availablePubs.map((pub) => {
            return <option key={pub._id}>{pub.name}</option>;
          })}
        </select>
        <button className="btn btn-default" onClick={::this.handleSubmitButtonClick}>Submit</button>
      </div>
    );
  }
}
