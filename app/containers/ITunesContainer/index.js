/**
 *
 * ITunesContainer
 *
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { debounce, isEmpty, get } from 'lodash';
import styled from 'styled-components';
import { injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card, Input, Skeleton } from 'antd';
import ITunesCard from '@app/components/ITunesCard';
import { selectITunesContainer, selectITunesSearchQuery, selectITunesData, selectITunesError } from './selectors';
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

export function ITunesContainer({
  dispatchITunesSongs,
  dispatchClearITunesSongs,
  searchQuery,
  iTunesError,
  iTunesData,
  intl,
  maxwidth
}) {
  const [currentSongRef, setCurentSongRef] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(iTunesData, 'results', null) || iTunesError;
    if (loaded) {
      setLoading(false);
    }
  }, [iTunesData]);

  useEffect(() => {
    if (searchQuery && !iTunesData?.results?.length) {
      dispatchITunesSongs(searchQuery);
      setLoading(true);
    }
  }, []);

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
      <Skeleton loading={loading} active></Skeleton>
      <Container data-testid="container">
        {iTunesData?.results?.map((songDetails, index) => (
          <ITunesCard onActionClick={handleOnActionClick} track={songDetails} key={index} />
        ))}
      </Container>
    </div>
  );
}

ITunesContainer.propTypes = {
  dispatchITunesSongs: PropTypes.func,
  dispatchClearITunesSongs: PropTypes.func,
  maxwidth: PropTypes.number,
  iTunesData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  iTunesError: PropTypes.string,
  searchQuery: PropTypes.string,
  intl: PropTypes.object
};
ITunesContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  iTunesData: {},
  iTunesError: null
};
const mapStateToProps = createStructuredSelector({
  iTunesContainer: selectITunesContainer(),
  searchQuery: selectITunesSearchQuery(),
  iTunesData: selectITunesData(),
  iTunesError: selectITunesError()
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
