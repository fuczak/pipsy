import React, { Component, PropTypes } from 'react';
import PubHours from './PubHours';
import PubReviews from './PubReviews';

export default class PubDetails extends Component {
  static propTypes = {
    pub: PropTypes.object.isRequired
  }

  render() {
    const {pub} = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-2">
          {pub.details.opening_hours ?
            <PubHours hours={pub.details.opening_hours} /> :
            <div>
              <h2 className="text-muted"><em>No opening hours info available</em></h2>
            </div>
          }
        </div>
        <div className="col-md-4">
          {pub.details.rating ?
            <div>
              <h2 className="text-center">Rating: {pub.details.rating} / 5</h2>
              <PubReviews reviews={pub.details.reviews} />
            </div> :
            <div>
              <h2 className="text-muted"><em>No reviews</em></h2>
            </div>
          }
        </div>
      </div>
    );
  }
}
