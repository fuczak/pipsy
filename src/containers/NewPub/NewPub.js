import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pubsActions from 'redux/modules/pubs';
// import { PubForm } from 'components';
import { PubSearch, PubMap, PubBasicInfo, PubDetails } from 'components';

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
    const styles = require('./NewPub.scss');
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
          <div className="row">
            <div className="col-md-1">
              <img src={selectedPub.details.icon} alt="" className={styles.icon + ' img-responsive'}/>
            </div>
            <div className="col-md-7">
              <PubBasicInfo pub={selectedPub} />
            </div>
            <div className="col-md-4">
              <button className={styles.addpub + ' btn btn-success btn-lg pull-left'}>Add to Database</button>
            </div>
            <PubMap
              lat={selectedPub.details.geometry.location.lat}
              lng={selectedPub.details.geometry.location.lng} />
            <PubDetails pub={selectedPub} />
          </div>
        }
      </div>
    );
  }
}
