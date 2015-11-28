import React, { Component, PropTypes } from 'react';

export default class PubHours extends Component {
  static propTypes = {
    hours: PropTypes.object.isRequired
  }

  render() {
    const {hours} = this.props;
    return (
      <div>
        <h2>
          Opening Hours
          <small>
            {hours.open_now ?
              <span className="label label-success">Open</span> :
              <span className="label label danger">Closed</span>
            }
          </small>
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
