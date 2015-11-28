import React, { Component, PropTypes } from 'react';

export default class PubBasicInfo extends Component {
  static propTypes = {
    pub: PropTypes.object.isRequired
  }
  render() {
    const styles = require('./PubBasicInfo.scss');
    const {pub} = this.props;
    return (
      <div className={styles.details}>
        <a target="_blank" href={pub.details.website}><h2>{pub.details.name}</h2></a>
        {pub.details.international_phone_number &&
        <span className={styles.span}>
          <i className={styles.icon + ' fa fa-phone'}></i>
          <a href={'tel:' + pub.details.international_phone_number}>{pub.details.formatted_phone_number}</a>
        </span>}
        <span className="text-muted">
          {pub.details.formatted_address}
        </span>
      </div>
    );
  }
}
