import React, { Component, PropTypes } from 'react';

export default class BoardgameListItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    year: PropTypes.number,
    thumbnail: PropTypes.string,
    score: PropTypes.number
  }

  render() {
    const { name, year, thumbnail, score } = this.props;
    return (
      <div className="media">
        <div className="media-left media-middle">
          {thumbnail ?
          <img src={thumbnail} alt={name} className="media-object" /> :
          <img src="http://placehold.it/80x80" alt={name} className="media-object" /> }
        </div>
        <div className="media-body">
          <h4 className="media-heading">{name}</h4>
          <p><em>{year}</em>, {score}</p>
        </div>
      </div>
    );
  }
}
