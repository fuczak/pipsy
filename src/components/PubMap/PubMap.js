import React, { Component, PropTypes } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';

export default class PubMap extends Component {
  static propTypes = {
    street: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
  }

  render() {
    return (
      <div>
        <GoogleMap containerProps={{
          ...this.props,
          style: {
            height: '300px',
            width: '600px'
          }
        }}
        defaultZoom={15}
        defaultCenter={{
          lat: 50.05,
          lng: 19.94
        }}>
        <Marker position={{
          lat: 50.05,
          lng: 19.94
        }} />
        </GoogleMap>
      </div>
    );
  }
}
