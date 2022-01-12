/**
 *
 * ITunesContainer
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import makeSelectITunesContainer from './selectors';
import saga from './saga';

export function ITunesContainer() {
  return (
    <div>
      <T id={'ITunesContainer text'} />
    </div>
  );
}

ITunesContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  iTunesContainer: makeSelectITunesContainer()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'iTunesContainer', saga: saga }))(ITunesContainer);

export const ITunesContainerTest = compose(injectIntl)(ITunesContainer);
