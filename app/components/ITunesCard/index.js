/**
 *
 * ITunesCard
 *
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Card, Popover } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import T from '@components/T';
import { colors } from '@app/themes/index';

const CustomCard = styled(Card)`
  && {
    margin: 1.25em 0;
    box-shadow: ${colors.boxShadow};
  }
`;
const Wrapper = styled.div`
  display: flex;
  alig-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  gap: 1em;
`;
const CustomButton = styled.button`
  displaty: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.buttonBg};
  border: none;
  border-radius: 0.2em;
  cursor: pointer;
`;
const CustomImg = styled.img`
  display: block;
  width: 45%;
  margin: 0.75rem auto;
`;

export function ITunesCard({ track, onActionClick }) {
  const audioRef = useRef(null);
  const { artistName, trackName, collectionName, trackPrice, primaryGenreName, previewUrl, artworkUrl100 } = track;

  const playerAction = {
    play: 'PLAY',
    pause: 'PAUSE'
  };

  const handleTrackPlay = (action) => {
    if (action === playerAction.play) {
      audioRef.current.play();
      onActionClick(audioRef);
    }
    if (action === playerAction.pause) {
      audioRef.current.pause();
    }
  };

  const text = <T id="details" type="subheading" marginBottom={5} />;
  const content = (
    <>
      <T id="track-price" values={{ price: trackPrice }} />
      <T id="genre-name" values={{ name: primaryGenreName }} />
    </>
  );
  return (
    <CustomCard data-testid="i-tunes-card">
      <T data-testid="collectionName" id="collection-name" values={{ name: collectionName }} />
      <Popover placement="topRight" title={text} content={content}>
        <CustomImg src={artworkUrl100} alt="artwork" />
      </Popover>
      <Wrapper>
        <CustomButton data-testid="playButton" onClick={() => handleTrackPlay(playerAction.play)}>
          <PlayCircleOutlined style={{ fontSize: '20px' }} />
        </CustomButton>
        <CustomButton data-testid="pauseButton" onClick={() => handleTrackPlay(playerAction.pause)}>
          <PauseCircleOutlined style={{ fontSize: '20px' }} />
        </CustomButton>
      </Wrapper>
      <audio data-testid="audioElement" ref={audioRef} src={previewUrl} onClick={handleTrackPlay} />
      <T data-testid="trackName" id="track-name" values={{ name: trackName }} type="subheading" marginBottom={5} />
      <T data-testid="artistName" id="artist-name" values={{ name: artistName }} />
    </CustomCard>
  );
}

ITunesCard.propTypes = {
  track: PropTypes.object,
  onActionClick: PropTypes.func
};

export default ITunesCard;
