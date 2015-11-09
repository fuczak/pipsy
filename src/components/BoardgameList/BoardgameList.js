import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { BoardgameListItem } from 'components';

export default class BoardgameList extends Component {
  static propTypes = {
    boardgames: PropTypes.array
  }

  handleCardClick(ev, gameId) {
    console.log(ev.currentTarget, gameId);
  }

  render() {
    const { boardgames } = this.props;
    const styles = require('./BoardgameList.scss');
    return (
      <div>
        <ul className={styles.boardgameList}>
          {/* TODO: Make ReactCSSTransitionGroup work somehow */}
          <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {boardgames.map((game) => {
            return (
              <li className={styles.boardgameListItem} key={game.id} onClick={(ev) => this.handleCardClick(ev, game.id)}>
                <BoardgameListItem name={game.name} year={game.year} />
              </li>
            );
          })}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
}
