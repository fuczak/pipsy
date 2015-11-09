import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as boardgamesActions from 'redux/modules/boardgames';
import { BoardgameSearch, BoardgameList } from 'components';

@connect(
  state => ({boardgames: state.boardgames.foundBoardgames}),
  boardgamesActions
)
export default class Boardgames extends Component {
  static propTypes = {
    boardgames: PropTypes.array.isRequired,
    load: PropTypes.func.isRequired
  }

  render() {
    const { boardgames, load } = this.props;
    return (
      <div className="container row">
        <div className="col-md-4">
          <h2>Wyszukaj grę planszową</h2>
          <BoardgameSearch load={load} />
          <BoardgameList boardgames={boardgames} />
        </div>
        <div className="col-md-4">
          <h2>Dodaj to poczekalni</h2>
        </div>
        <div className="col-md-4">
          <h2>I zapisz jako dostępną w odpowiednim pubie</h2>
        </div>
      </div>
    );
  }
}
