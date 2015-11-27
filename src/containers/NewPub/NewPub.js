import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pubsActions from 'redux/modules/pubs';
// import { PubForm } from 'components';
import { PubSearch, PubMap } from 'components';

@connect(
  (state) => ({
    foundPlaces: state.pubs.foundPlaces,
    selectedPub: state.pubs.selectedPub
  }),
  (dispatch) => (
    bindActionCreators(pubsActions, dispatch)
  )
)
export default class NewPub extends Component {
  static propTypes = {
    foundPlaces: PropTypes.array.isRequired,
    selectedPub: PropTypes.object.isRequired,
    postPub: PropTypes.func.isRequired,
    queryPlaces: PropTypes.func.isRequired,
    clearPlaces: PropTypes.func.isRequired,
    clickedOnPlaceSuggestion: PropTypes.func.isRequired
  }

  handleFormSubmit = (pubObject) => {
    this.props.postPub(pubObject);
  }

  handleSearchChange = (ev) => {
    this.props.queryPlaces(ev.target.value);
  }

  handleListItemClick = (placeId, description) => {
    this.props.clickedOnPlaceSuggestion(placeId, description);
    this.props.clearPlaces();
  }

  render() {
    const {selectedPub} = this.props;
    return (
      <div>
        <h1 className="text-center">Please fill all the fields below</h1>
        {/* <PubForm onSubmit={this.handleFormSubmit}/> */}
        <PubSearch
          foundPlaces={this.props.foundPlaces}
          onInputChange={this.handleSearchChange}
          onListItemClick={this.handleListItemClick}
          onClear={this.props.clearPlaces}/>
        {selectedPub && selectedPub.details &&
          <div>
            <a href={selectedPub.details.website}><h2>{selectedPub.details.name}</h2></a>
            <p>{selectedPub.details.formatted_address}</p>
            <PubMap
              lat={selectedPub.details.geometry.location.lat}
              lng={selectedPub.details.geometry.location.lng} />
          </div>
        }
      </div>
    );
  }
}
