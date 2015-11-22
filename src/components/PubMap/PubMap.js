import React, { Component, PropTypes } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';

export default class PubMap extends Component {
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
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
        center={{
          lat: this.props.lat,
          lng: this.props.lng
        }}>
        <Marker position={{
          lat: this.props.lat,
          lng: this.props.lng
        }} />
        </GoogleMap>
      </div>
    );
  }
}
