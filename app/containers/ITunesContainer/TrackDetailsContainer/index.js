/**
 *
 *TrackDetailsContainer
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';

import { compose } from 'redux';

export function TrackDetailsContainer() {
  return (
    <div>
      <T id={'details'} />
    </div>
  );
}

TrackDetailsContainer.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(TrackDetailsContainer);

export const TrackDetailsContainerTest = compose(injectIntl)(TrackDetailsContainer);
