import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as boardgamesActions from 'redux/modules/boardgames';
import Spinner from 'react-spinkit';
import { BoardgameSearch, BoardgameList } from 'components';
import { Pubs } from 'containers';

@connect(
  state => ({
    foundBoardgames: state.boardgames.foundBoardgames,
    stagedBoardgames: state.boardgames.stagedBoardgames,
    responseReceived: state.boardgames.responseReceived,
    isFetching: state.boardgames.isFetching,
    selectedEndpoint: state.boardgames.selectedEndpoint,
    availableEndpoints: state.boardgames.availableEndpoints
  }),
  boardgamesActions
)
export default class Boardgames extends Component {
  static propTypes = {
    foundBoardgames: PropTypes.array,
    stagedBoardgames: PropTypes.array,
    responseReceived: PropTypes.bool,
    isFetching: PropTypes.bool,
    selectedEndpoint: PropTypes.string,
    availableEndpoints: PropTypes.array,
    load: PropTypes.func,
    selectEndpoint: PropTypes.func,
    moveClickedToStaging: PropTypes.func,
    removeFromStaging: PropTypes.func
  }

  render() {
    const { foundBoardgames, stagedBoardgames, responseReceived, isFetching, selectedEndpoint, availableEndpoints, load, selectEndpoint, moveClickedToStaging, removeFromStaging } = this.props;
    return (
      <div className="container row">
        <div className="col-md-4">
          <h2>Wyszukaj grę planszową</h2>
          <BoardgameSearch load={load} selectedEndpoint={selectedEndpoint} availableEndpoints={availableEndpoints} onSelectEndpoint={selectEndpoint}/>
            {responseReceived && foundBoardgames.length === 0 ?
              <p>Nie znaleziono.</p> :
              null
            }
            {isFetching ?
              <Spinner spinnerName="three-bounce" /> : null
            }
            <BoardgameList boardgames={foundBoardgames} handleCardClick={moveClickedToStaging}/>
        </div>
        <div className="col-md-4">
          <h2>Dodaj to poczekalni</h2>
          <BoardgameList boardgames={stagedBoardgames} handleCardClick={removeFromStaging}/>
        </div>
        <div className="col-md-4">
          <h2>I zapisz jako dostępną w odpowiednim pubie</h2>
          <Pubs />
        </div>
      </div>
    );
  }
}
