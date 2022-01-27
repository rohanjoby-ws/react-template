/**
 *
 * ITunesCard
 *
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import truncate from 'lodash/truncate';
import { isEmpty } from 'lodash';
import { Card, Popover, Button, Progress } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import T from '@components/T';
import If from '@components/If';
import { colors } from '@app/themes';
import { ACTIONS } from '@utils/constants';

const CustomCard = styled(Card)`
  && {
    margin: 1.25em 0;
    box-shadow: ${colors.boxShadow};
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  gap: 1em;
`;
const CustomImg = styled.img`
  display: block;
  margin: 0.75rem auto;
  height: 10rem;
`;

export function ITunesCard({ track, onActionClick }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [intervalStore, setIntervalStore] = useState(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalStore);
    };
  }, []);
  useEffect(() => {
    clearInterval(intervalStore);
  }, [track]);

  function calculateProgress() {
    const intervalValue = setInterval(() => {
      const fraction = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(fraction);
    }, 1000);
    setIntervalStore(intervalValue);
  }
  const handleTrackPlay = (action) => {
    if (action === ACTIONS.PLAY) {
      calculateProgress();
    } else {
      clearInterval(intervalStore);
    }
    onActionClick(audioRef, action);
  };

  const text = <T id="details" type="subheading" marginBottom={5} />;
  const content = (
    <>
      <If condition={track?.trackPrice} otherwise={<T data-testid="price-unavailable" id="track_price_unavailable" />}>
        <T id="track-price" values={{ price: track?.trackPrice }} />
      </If>
      <If
        condition={!isEmpty(track?.primaryGenreName)}
        otherwise={<T data-testid="genre-unavailable" id="track_genre_unavailable" />}
      >
        <T id="genre-name" values={{ name: track?.primaryGenreName }} />
      </If>
    </>
  );
  return (
    <CustomCard data-testid="itunes-card">
      <If
        condition={!isEmpty(track?.collectionName)}
        otherwise={<T data-testid="collection-unavailable" id="collection_name_unavailable" />}
      >
        <T
          data-testid="collectionName"
          id="collection-name"
          values={{ name: truncate(track?.collectionName, { length: 28 }) }}
        />
      </If>
      <Popover placement="topRight" title={text} content={content}>
        <CustomImg src={track.artworkUrl100} alt="artwork" />
      </Popover>
      <Wrapper>
        <Button data-testid="play-button" onClick={() => handleTrackPlay(ACTIONS.PLAY)} type="text">
          <PlayCircleOutlined style={{ fontSize: '20px' }} />
        </Button>
        <Progress percent={progress} showInfo={false} data-testid="progress-bar" />
        <Button data-testid="pause-button" onClick={() => handleTrackPlay(ACTIONS.PAUSE)} type="text">
          <PauseCircleOutlined style={{ fontSize: '20px' }} />
        </Button>
      </Wrapper>
      <audio data-testid="audio-element" ref={audioRef} src={track.previewUrl} onClick={handleTrackPlay} />
      <If
        condition={!isEmpty(track?.trackName)}
        otherwise={<T data-testid="track-unavailable" id="track_name_unavailable" />}
      >
        <T
          data-testid="trackName"
          id="track-name"
          values={{ name: truncate(track?.trackName, { length: 28 }) }}
          type="subheading"
          marginBottom={5}
        />
      </If>
      <If
        condition={!isEmpty(track?.artistName)}
        otherwise={<T data-testid="artist-unavailable" id="artist_unavailable" />}
      >
        <T data-testid="artistName" id="artist-name" values={{ name: truncate(track?.artistName, { length: 35 }) }} />
      </If>
    </CustomCard>
  );
}

ITunesCard.propTypes = {
  track: PropTypes.object.isRequired,
  onActionClick: PropTypes.func
};

export default ITunesCard;
