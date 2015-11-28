import React, { Component, PropTypes } from 'react';
import { times } from 'lodash';

export default class PubStars extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired
  }
  constructor(props) {
    super(props);
    this.starsArray = this.props.rating.toString().split('.').map(el => Number(el));
  }

  render() {
    const array = this.starsArray;
    return (
      <span className="label label-primary">
        {times(array[0], (nr) => {
          return (<i key={'fullstar' + nr} className="fa fa-star"></i>);
        })}
        {array[1] >= 7 ? // eslint-disable-line
        <i className="fa fa-star"></i> :
          array[1] >= 5 ?
            <i className="fa fa-star-half-o"></i> :
            <i className="fa fa-star-o"></i>
        }
        {times(4 - array[0], (nr) => {
          return (<i key={'emptystar' + nr} className="fa fa-star-o"></i>);
        })}
      </span>
    );
  }
}
