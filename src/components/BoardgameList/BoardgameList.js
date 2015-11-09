import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { BoardgameListItem } from 'components';

export default class BoardgameList extends Component {
  static propTypes = {
    boardgames: PropTypes.array,
    handleCardClick: PropTypes.func
  }

  render() {
    const { boardgames, handleCardClick } = this.props;
    const styles = require('./BoardgameList.scss');
    return (
      <div>
        <ul className={styles.boardgameList}>
          {/* TODO: Make ReactCSSTransitionGroup work somehow */}
          <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {boardgames.map((game, index) => {
            return (
              <li className={styles.boardgameListItem} key={game.id} onClick={() => handleCardClick(index, game.score, game.id)}>
                <BoardgameListItem
                  thumbnail={game.thumbnail}
                  name={game.name}
                  year={game.year}
                  score={game.score} />
              </li>
            );
          })}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
}
