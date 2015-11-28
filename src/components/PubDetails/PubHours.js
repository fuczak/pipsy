import React, { Component, PropTypes } from 'react';

export default class PubHours extends Component {
  static propTypes = {
    hours: PropTypes.object.isRequired
  }

  render() {
    const {hours} = this.props;
    return (
      <div>
        <h2 className="text-center">
          Opening Hours
          <div>
            <small>
              {hours.open_now ?
                <span className="label label-success">Open now</span> :
                <span className="label label-danger">Closed now</span>
              }
            </small>
          </div>
          <hr />
        </h2>
          <ul>
            {hours.weekday_text.map((day, index) => {
              return (
                <li key={index}>
                  <p>{day}</p>
                </li>);
            })}
          </ul>
      </div>
    );
  }
}
