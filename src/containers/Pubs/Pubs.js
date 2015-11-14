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
    getPubs: PropTypes.func
  }

  componentDidMount() {
    if (this.props.availablePubs.length === 0) this.props.getPubs();
  }

  render() {
    return (
      <div>
        Pubs Component
        {this.props.availablePubs.map((pub) => {
          return <p key={pub._id}>{pub.name}</p>;
        })}
        <button className="btn" onClick={::this.props.getPubs}>Dawaj</button>
      </div>
    );
  }
}
