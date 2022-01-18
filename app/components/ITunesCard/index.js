/**
 *
 * ITunesCard
 *
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Card } from 'antd';
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
`;
const CustomImg = styled.img`
  display: block;
  width: 45%;
  margin: 0.75rem auto;
`;

export function ITunesCard({ artistName, trackName, collectionName, previewUrl, artworkUrl100, onActionClick }) {
  const audioRef = useRef(null);

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

  return (
    <CustomCard data-testid="i-tunes-card">
      <T data-testid="collectionName" id="collection-name" values={{ name: collectionName }} />
      <CustomImg src={artworkUrl100} alt="artwork" />
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
  artistName: PropTypes.string,
  trackName: PropTypes.string,
  collectionName: PropTypes.string,
  previewUrl: PropTypes.string,
  artworkUrl100: PropTypes.string,
  onActionClick: PropTypes.func
};
ITunesCard.defaultProps = {
  artistName: 'Mark Ronson',
  trackName: 'Uptown Funk (feat. Bruno Mars)',
  collectionName: 'Uptown Special',
  previewUrl:
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b9/0a/00/b90a0076-6ac1-0b1d-3693-ff106a79d906/mzaf_10894270267302036162.plus.aac.p.m4a',
  artworkUrl100:
    'https://is2-ssl.mzstatic.com/image/thumb/Music5/v4/22/a0/3e/22a03e12-0c97-b5fc-d693-c02186f6c79d/source/100x100bb.jpg'
};

export default ITunesCard;
