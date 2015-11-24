import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { PubMap } from 'components';

export default class PubCard extends Component {
  static propTypes = {
    pub: PropTypes.object.isRequired,
    onDeletePub: PropTypes.func.isRequired
  }

  render() {
    const {pub, onDeletePub} = this.props;
    return (
      <div className="thumbnail">
        {/* <img src="http://placehold.it/400/400" />*/}
        <PubMap lat={pub.address.lat} lng={pub.address.lng} />
        <div className="caption">
          <h2>{pub.name}</h2>
          <p>{pub.address.street} <strong>{pub.address.number}</strong></p>
          <p>
            <Link to={'/pubs/' + pub._id} className="btn btn-primary">Edit</Link>
            <button className="btn btn-danger" onClick={onDeletePub}>Delete</button>
          </p>
        </div>
      </div>
    );
  }
}
