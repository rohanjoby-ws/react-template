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
import logo from '@images/icon-512x512.png';

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
      audioRef.current.play();
      calculateProgress();
    }
    if (action === ACTIONS.PAUSE) {
      audioRef.current.pause();
      clearInterval(intervalStore);
    }
    onActionClick(audioRef);
  };

  const text = <T id="details" type="subheading" marginBottom={5} />;
  const content = (
    <>
      <If condition={track?.trackPrice} otherwise={<T data-testid="price-unavailable" id="track_price_unavailable" />}>
        <T data-testid="track-price" id="track-price" values={{ price: track?.trackPrice }} />
      </If>
      <If
        condition={!isEmpty(track?.primaryGenreName)}
        otherwise={<T data-testid="genre-unavailable" id="track_genre_unavailable" />}
      >
        <T data-testid="genre-name" id="genre-name" values={{ name: track?.primaryGenreName }} />
      </If>
    </>
  );
  const noArtWork = (
    <Popover placement="topRight" title={text} content={content}>
      <CustomImg data-testid="track-art-unavailable" src={logo} alt="artwork" />
    </Popover>
  );
  return (
    <CustomCard data-testid="itunes-card">
      <If
        condition={!isEmpty(track?.collectionName)}
        otherwise={<T data-testid="collection-unavailable" id="collection_name_unavailable" />}
      >
        <T
          data-testid="collection-name"
          id="collection-name"
          values={{ name: truncate(track?.collectionName, { length: 28 }) }}
        />
      </If>
      <If condition={track?.artworkUrl100} otherwise={noArtWork}>
        <Popover placement="topRight" title={text} content={content}>
          <CustomImg data-testid="track-art" src={track?.artworkUrl100} alt="artwork" />
        </Popover>
      </If>
      <Wrapper data-testid="player-wrapper">
        <Button data-testid="play-button" onClick={() => handleTrackPlay(ACTIONS.PLAY)} type="text">
          <PlayCircleOutlined style={{ fontSize: '20px' }} />
        </Button>
        <Progress percent={progress} showInfo={false} data-testid="progress-bar" />
        <Button data-testid="pause-button" onClick={() => handleTrackPlay(ACTIONS.PAUSE)} type="text">
          <PauseCircleOutlined style={{ fontSize: '20px' }} />
        </Button>
      </Wrapper>
      <audio data-testid="audio-element" ref={audioRef} src={track?.previewUrl} onClick={handleTrackPlay} />
      <If
        condition={!isEmpty(track?.trackName)}
        otherwise={<T data-testid="track-unavailable" id="track_name_unavailable" />}
      >
        <T
          data-testid="track-name"
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
        <T data-testid="artist-name" id="artist-name" values={{ name: truncate(track?.artistName, { length: 35 }) }} />
      </If>
    </CustomCard>
  );
}

ITunesCard.propTypes = {
  track: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    trackPrice: PropTypes.number.isRequired,
    primaryGenreName: PropTypes.string.isRequired
  }),
  onActionClick: PropTypes.func
};

export default ITunesCard;
