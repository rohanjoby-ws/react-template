/**
 *
 * ITunesContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import styled from 'styled-components';
import { injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card, Input } from 'antd';
import makeSelectITunesContainer from './selectors';
import saga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
  }
`;

export function ITunesContainer({ maxwidth }) {
  return (
    <div>
      <CustomCard title="iTunes Search" maxwidth={maxwidth}>
        <Search data-testid="search-bar" type="text" />
      </CustomCard>
    </div>
  );
}

ITunesContainer.propTypes = {
  maxwidth: PropTypes.number
};
ITunesContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};
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
