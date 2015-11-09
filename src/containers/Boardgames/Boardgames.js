import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as boardgamesActions from 'redux/modules/boardgames';
import { BoardgameSearch, BoardgameList } from 'components';

@connect(
  state => ({
    foundBoardgames: state.boardgames.foundBoardgames,
    stagedBoardgames: state.boardgames.stagedBoardgames,
    responseReceived: state.boardgames.responseReceived,
    currentInput: state.boardgames.currentInput
  }),
  boardgamesActions
)
export default class Boardgames extends Component {
  static propTypes = {
    foundBoardgames: PropTypes.array,
    stagedBoardgames: PropTypes.array,
    responseReceived: PropTypes.bool,
    currentInput: PropTypes.string,
    loadFromDB: PropTypes.func,
    loadFromBGG: PropTypes.func,
    moveClickedToStaging: PropTypes.func,
    removeFromStaging: PropTypes.func
  }

  render() {
    const { foundBoardgames, stagedBoardgames, responseReceived, currentInput, loadFromDB, loadFromBGG, moveClickedToStaging, removeFromStaging } = this.props;
    return (
      <div className="container row">
        <div className="col-md-4">
          <h2>Wyszukaj grę planszową</h2>
          <BoardgameSearch load={loadFromDB} buttonText="Wyszukaj w BGG"/>
          {responseReceived && foundBoardgames.length === 0 ?
            <p>Nic nie znaleziono. <a href="#" onClick={() => loadFromBGG(currentInput)}>Wyszukaj w BGG</a></p> :
            null
          }
          <BoardgameList boardgames={foundBoardgames} handleCardClick={moveClickedToStaging}/>
        </div>
        <div className="col-md-4">
          <h2>Dodaj to poczekalni</h2>
          <BoardgameList boardgames={stagedBoardgames} handleCardClick={removeFromStaging}/>
        </div>
        <div className="col-md-4">
          <h2>I zapisz jako dostępną w odpowiednim pubie</h2>
        </div>
      </div>
    );
  }
}
