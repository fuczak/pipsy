import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pubsActions from 'redux/modules/pubs';
import { PubForm } from 'components';

@connect(
  (state) => ({
    selectedPub: state.pubs.selectedPub,
    pubId: state.router.params.id
  }),
  (dispatch) => (
    bindActionCreators(pubsActions, dispatch)
  )
)
export default class EditPub extends Component {
  static propTypes = {
    selectedPub: PropTypes.object.isRequired,
    pubId: PropTypes.string.isRequired,
    setSelectedPubById: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.setSelectedPubById(this.props.pubId);
  }

  handleEditSubmit = (ev) => {
    console.log(ev);
  }

  render() {
    const {selectedPub} = this.props;
    // TODO: Need to declare pub object like this since redux-form doesn't support nested fields
    const pub = {
      name: selectedPub.name,
      addressStreet: selectedPub.addressStreet,
      addressNumber: selectedPub.addressNumber,
      oMon: selectedPub.openingHours.Mon[0], cMon: selectedPub.openingHours.Mon[1]
    };
    return (
      <div>
        <PubForm initialValues={pub} onSubmit={this.handleEditSubmit}/>
      </div>
    );
  }
}
