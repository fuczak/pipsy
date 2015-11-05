import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as boardgamesActions from 'redux/modules/boardgames';

@connect(
  state => ({boardgames: state.boardgames}),
  boardgamesActions
)
export default class Boardgames extends Component {
  static propTypes = {
    boardgames: PropTypes.object.isRequired,
    load: PropTypes.func
  }

  render() {
    const {boardgames, load} = this.props;
    return (
      <div>
        <h1>This is a Boardgames component.</h1>
        {boardgames.length}
        <input type="text" ref="boardgameQuery" onChange={(ev) => load(ev.target.value)}/>
      </div>
    );
  }
}
