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
    return (
      <div>
        <PubForm onSubmit={this.handleFormSubmit}/>
      </div>
    );
  }
}
