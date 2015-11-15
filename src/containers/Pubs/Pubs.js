import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pubsActions from 'redux/modules/pubs';
import { submitStagedGames } from 'redux/modules/boardgames';

@connect(
  (state) => ({
    availablePubs: state.pubs.availablePubs,
    selectedPub: state.pubs.selectedPub
  }),
  (dispatch) => ({
    pubsActions: bindActionCreators(pubsActions, dispatch),
    submitStagedGames: bindActionCreators(submitStagedGames, dispatch)
  })
)
export default class Pubs extends Component {
  static propTypes = {
    availablePubs: PropTypes.array,
    selectedPub: PropTypes.object,
    pubsActions: PropTypes.object,
    submitStagedGames: PropTypes.func
  }

  componentDidMount() {
    if (this.props.availablePubs.length === 0) this.props.pubsActions.getPubs();
  }

  handleSelectedPubChange(ev) {
    this.props.pubsActions.setSelectedPub(ev.target.selectedIndex);
  }

  handleSubmitButtonClick() {
    this.props.submitStagedGames();
  }

  render() {
    return (
      <div>
        <select className="form-control" defaultValue={this.props.availablePubs[0]} onChange={::this.handleSelectedPubChange}>
          {this.props.availablePubs.map((pub) => {
            return <option key={pub._id}>{pub.name}</option>;
          })}
        </select>
        <button className="btn btn-primary btn-block" onClick={::this.handleSubmitButtonClick}>Submit</button>
      </div>
    );
  }
}
