import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pubsActions from 'redux/modules/pubs';
// import { PubForm } from 'components';
import { PubSearch } from 'components';

@connect(
  (state) => ({
    foundPlaces: state.pubs.foundPlaces
  }),
  (dispatch) => (
    bindActionCreators(pubsActions, dispatch)
  )
)
export default class NewPub extends Component {
  static propTypes = {
    foundPlaces: PropTypes.array.isRequired,
    postPub: PropTypes.func.isRequired,
    queryPlaces: PropTypes.func.isRequired
  }

  handleFormSubmit = (pubObject) => {
    this.props.postPub(pubObject);
  }

  handleSearchChange = (ev) => {
    this.props.queryPlaces(ev.target.value);
  }

  handleListItemClick = (id) => {
    console.log(id);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <h1>Please fill all the fields below</h1>
          {/* <PubForm onSubmit={this.handleFormSubmit}/> */}
          <PubSearch onInputChange={this.handleSearchChange}/>
          <ul className="list-group">
            {this.props.foundPlaces.map((place) => {
              return (
                <li className="list-group-item"
                  key={place.id}
                  onClick={this.handleListItemClick.bind(this, place.place_id)}>
                  {place.description}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
