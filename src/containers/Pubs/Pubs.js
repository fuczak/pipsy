import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pubsActions from 'redux/modules/pubs';
import { arePubsLoaded, getPubs } from 'redux/modules/pubs';
import { PubCard } from 'components';

@connect(
  (state) => ({
    availablePubs: state.pubs.availablePubs,
    selectedPub: state.pubs.selectedPub
  }),
  (dispatch) => ({
    pubsActions: bindActionCreators(pubsActions, dispatch)
  })
)
export default class Pubs extends Component {
  static propTypes = {
    availablePubs: PropTypes.array,
    selectedPub: PropTypes.object,
    pubsActions: PropTypes.object
  }

  componentDidMount() {
    if (this.props.availablePubs.length === 0) this.props.pubsActions.getPubs();
  }

  static fetchData(getState, dispatch) {
    console.log('fetchData called');
    if (!arePubsLoaded(getState())) dispatch(getPubs());
  }

  render() {
    const { availablePubs } = this.props;
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <button className="btn btn-success">Add new pub</button>
          <div className="row">
            {availablePubs.map((pub) => {
              return (
                <div key={pub._id} className="col-md-3">
                  <PubCard pub={pub} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
