import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class PubReviews extends Component {
  static propTypes = {
    reviews: PropTypes.array.isRequired
  }

  render() {
    const {reviews} = this.props;
    return (
      <div>
        {reviews
          .sort((prev, cur) => {
            return cur.time - prev.time;
          })
          .map((rev, index) => {
            return (
              <div key={index} className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <strong>{rev.author_name}</strong> - <span className="badge">{rev.rating} </span>
                    <small className="pull-right"><em>{moment.unix(rev.time).fromNow()}</em></small>
                    </h4>
                </div>
                {rev.text &&
                  <div className="panel-body">
                    <p>
                      {rev.text}
                    </p>
                  </div>
                }
              </div>
            );
          })}
      </div>
    );
  }
}
