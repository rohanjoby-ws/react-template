/**
 *
 * ITunesContainer
 *
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { debounce, isEmpty } from 'lodash';
import styled from 'styled-components';
import { injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card, Input } from 'antd';
import ITunesCard from '@app/components/ITunesCard';
import makeSelectITunesContainer from './selectors';
import { iTunesContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 1.25rem 0;
    max-width: ${(props) => props.maxwidth};
  }
`;
const Container = styled.div`
  && {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1em;
    padding: 1em;
  }
`;

export function ITunesContainer({ dispatchITunesSongs, dispatchClearITunesSongs, intl, maxwidth }) {
  const [currentSongRef, setCurentSongRef] = useState(null);

  const handleOnChange = (sQuery) => {
    if (!isEmpty(sQuery)) {
      dispatchITunesSongs(sQuery);
    } else {
      dispatchClearITunesSongs();
    }
  };

  const handleOnActionClick = (trackRef) => {
    if (isEmpty(currentSongRef)) {
      setCurentSongRef(trackRef);
    } else {
      if (trackRef !== currentSongRef) {
        currentSongRef.current.pause();
        setCurentSongRef(trackRef);
      }
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  return (
    <div>
      <CustomCard title={intl.formatMessage({ id: 'iTunes_search' })} maxwidth={maxwidth}>
        <Search
          data-testid="search-bar"
          type="text"
          placeholder={intl.formatMessage({ id: 'search_for_music' })}
          onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
          onSearch={(searchText) => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      <Container data-testid="container">
        <ITunesCard onActionClick={handleOnActionClick} />
        <ITunesCard onActionClick={handleOnActionClick} />
        <ITunesCard onActionClick={handleOnActionClick} />
      </Container>
    </div>
  );
}

ITunesContainer.propTypes = {
  dispatchITunesSongs: PropTypes.func,
  dispatchClearITunesSongs: PropTypes.func,
  maxwidth: PropTypes.number,
  intl: PropTypes.object
};
ITunesContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};
const mapStateToProps = createStructuredSelector({
  iTunesContainer: makeSelectITunesContainer()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetITunesSongs, clearGetITunesSongs } = iTunesContainerCreators;
  return {
    dispatchITunesSongs: (searchQuery) => dispatch(requestGetITunesSongs(searchQuery)),
    dispatchClearITunesSongs: () => dispatch(clearGetITunesSongs())
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'iTunesContainer', saga: saga })
)(ITunesContainer);

export const ITunesContainerTest = compose(injectIntl)(ITunesContainer);
