import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';

export default class PubSearch extends Component {
  static propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onListItemClick: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    foundPlaces: PropTypes.array
  }

  clearInput = () => {
    this.searchbox.value = '';
    this.props.onClear();
  }

  render() {
    const styles = require('./PubSearch.scss');
    return (
      <div className={styles.wrapper}>
        <i className={styles.iconleft + ' fa fa-search'}></i>
        <input className={styles.hasIcon + ' form-control'}
          type="text"
          ref={(ref) => this.searchbox = ref}
          onChange={debounce(this.props.onInputChange, 400)} />
        <ul className={styles.publist + ' list-group'}>
          {this.props.foundPlaces.map((place) => {
            return (
              <li className={styles.item + ' list-group-item'}
                key={place.id}
                onClick={this.props.onListItemClick.bind(this, place.place_id, place.description)}>
                {place.description}
              </li>
            );
          })}
        </ul>
        <i className={styles.iconright + ' fa fa-times'} onClick={this.clearInput}></i>
      </div>
    );
  }
}
