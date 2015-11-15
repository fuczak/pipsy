import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class PubCard extends Component {
  static propTypes = {
    pub: PropTypes.object.isRequired
  }

  render() {
    const {pub} = this.props;
    return (
      <div className="thumbnail">
        <img src="http://placehold.it/400/400" />
        <div className="caption">
          <h2>{pub.name}</h2>
          <p>{pub._id}</p>
          <p>
            <Link to={'/pubs/' + pub._id} className="btn btn-primary">Edit</Link>
            <button className="btn btn-danger">Delete</button>
          </p>
        </div>
      </div>
    );
  }
}
