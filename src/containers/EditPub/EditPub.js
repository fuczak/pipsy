import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pubsActions from 'redux/modules/pubs';
import { PubForm } from 'components';
import schemaConverter from '../../helpers/formToPubSchema';

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

  handleFormSubmit = (ev) => {
    const pubData = schemaConverter(ev);
    console.log(pubData);
  }

  render() {
    const {selectedPub} = this.props;
    // TODO: Need to declare pub object like this since redux-form doesn't support nested fields
    const pub = {
      name: selectedPub.name,
      addressStreet: selectedPub.address.street,
      addressNumber: selectedPub.address.number,
      oMon: selectedPub.openingHours.mon[0], cMon: selectedPub.openingHours.mon[1],
      oTue: selectedPub.openingHours.tue[0], cTue: selectedPub.openingHours.tue[1],
      oWed: selectedPub.openingHours.wed[0], cWed: selectedPub.openingHours.wed[1],
      oThu: selectedPub.openingHours.thu[0], cThu: selectedPub.openingHours.thu[1],
      oFri: selectedPub.openingHours.fri[0], cFri: selectedPub.openingHours.fri[1],
      oSat: selectedPub.openingHours.sat[0], cSat: selectedPub.openingHours.sat[1],
      oSun: selectedPub.openingHours.sun[0], cSun: selectedPub.openingHours.sun[1],
    };
    return (
      <div>
        <PubForm initialValues={pub} onSubmit={this.handleFormSubmit}/>
      </div>
    );
  }
}
