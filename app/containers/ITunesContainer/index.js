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
import If from '@app/components/If';
import T from '@app/components/T';
import For from '@app/components/For';
import ITunesCard from '@app/components/ITunesCard';
import { selectITunesSearchQuery, selectITunesData, selectITunesError } from './selectors';
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
    const loaded = get(iTunesData, 'results', iTunesError);
    if (loaded) {
      setLoading(false);
    }
  }, [iTunesData, iTunesError]);

  useEffect(() => {
    if (searchQuery && !iTunesData?.results?.length) {
      dispatchITunesSongs(searchQuery);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (sQuery) => {
    if (!isEmpty(sQuery)) {
      dispatchITunesSongs(sQuery);
      setLoading(true);
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

  const renderTrackDetails = () => {
    const items = get(iTunesData, 'results', []);
    const totalCount = get(iTunesData, 'resultCount', 0);
    return (
      <If condition={!isEmpty(items) || loading}>
        <CustomCard>
          <Skeleton loading={loading} active>
            <If condition={!isEmpty(searchQuery)}>
              <div>
                <T id="search_term" values={{ searchQuery }} />
              </div>
            </If>
            <If condition={totalCount !== 0}>
              <div>
                <T id="matching_tracks" values={{ totalCount }} />
              </div>
            </If>
            <For
              of={items}
              ParentComponent={Container}
              renderItem={(item, index) => <ITunesCard key={index} onActionClick={handleOnActionClick} track={item} />}
            />
          </Skeleton>
        </CustomCard>
      </If>
    );
  };
  const renderErrorState = () => {
    let iTuneError;
    if (iTunesError) {
      iTuneError = iTunesError;
    } else if (isEmpty(searchQuery)) {
      iTuneError = 'itune_search_default';
    }
    return (
      !loading &&
      iTuneError && (
        <CustomCard color={iTunesError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'itune_grid' })}>
          <If condition={iTunesError} otherwise={<T data-testid="default-message" id={iTuneError} />}>
            <T data-testid="error-message" text={iTunesError} />
          </If>
        </CustomCard>
      )
    );
  };

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
      {renderTrackDetails()}
      {renderErrorState()}
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
