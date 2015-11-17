import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as pubsActions from 'redux/modules/pubs';
import { arePubsLoaded, getPubs } from 'redux/modules/pubs'; // eslint-disable-line no-unused-vars
import { PubCard } from 'components';

@connect(
  (state) => ({
    availablePubs: state.pubs.availablePubs,
    selectedPub: state.pubs.selectedPub
  }),
  (dispatch) => (
    bindActionCreators(pubsActions, dispatch)
  )
)
export default class Pubs extends Component {
  static propTypes = {
    children: PropTypes.object,
    availablePubs: PropTypes.array,
    selectedPub: PropTypes.object,
    getPubs: PropTypes.func.isRequired,
    deletePub: PropTypes.func.isRequired
  }

  static fetchDataDeferred(getState, dispatch) {
    // if (!arePubsLoaded(getState())) dispatch(getPubs());
    dispatch(getPubs());
  }

  handlePubDelete(id) {
    this.props.deletePub(id);
  }

  render() {
    const { availablePubs } = this.props;
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <Link to={'/pubs/new'} className="btn btn-success">Add new pub</Link>
          <div className="row">
            {availablePubs.map((pub) => {
              return (
                <div key={pub._id} className="col-md-3">
                  <PubCard pub={pub} onDeletePub={::this.handlePubDelete.bind(this, pub._id)}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
