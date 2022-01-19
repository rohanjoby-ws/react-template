/**
 *
 * ITunesCard
 *
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import truncate from 'lodash/truncate';
import { Card, Popover, Tooltip, Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, LinkOutlined } from '@ant-design/icons';
import T from '@components/T';
import { colors } from '@app/themes/index';
import { PLAY, PAUSE } from '@utils/constants';

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
  width: 45%;
  margin: 0.75rem auto;
`;

export function ITunesCard({ track, onActionClick }) {
  const audioRef = useRef(null);
  const { artistName, trackName, collectionName, trackPrice, primaryGenreName, previewUrl, artworkUrl100 } = track;

  const handleTrackPlay = (action) => {
    if (action === PLAY) {
      audioRef.current.play();
    }
    if (action === PAUSE) {
      audioRef.current.pause();
    }
    onActionClick(audioRef);
  };

  const text = <T id="details" type="subheading" marginBottom={5} />;
  const content = (
    <>
      <T id="track-price" values={{ price: trackPrice }} />
      <T id="genre-name" values={{ name: primaryGenreName }} />
    </>
  );
  return (
    <CustomCard data-testid="itunes-card">
      <T
        data-testid="collectionName"
        id="collection-name"
        values={{ name: truncate(collectionName, { length: 28 }) }}
      />
      <Popover placement="topRight" title={text} content={content}>
        <CustomImg src={artworkUrl100} alt="artwork" />
      </Popover>
      <Wrapper>
        <Button data-testid="play-button" onClick={() => handleTrackPlay(PLAY)} type="text">
          <PlayCircleOutlined style={{ fontSize: '20px' }} />
        </Button>
        <Button data-testid="pause-button" onClick={() => handleTrackPlay(PAUSE)} type="text">
          <PauseCircleOutlined style={{ fontSize: '20px' }} />
        </Button>
      </Wrapper>
      <audio data-testid="audioElement" ref={audioRef} src={previewUrl} onClick={handleTrackPlay} />
      <T
        data-testid="trackName"
        id="track-name"
        values={{ name: truncate(trackName, { length: 28 }) }}
        type="subheading"
        marginBottom={5}
      />
      <T data-testid="artistName" id="artist-name" values={{ name: truncate(artistName, { length: 35 }) }} />
      <Tooltip key="artistViewUrl" title="View Artist">
        <Button type="link" target="_blank" href={track?.artistViewUrl} icon={<LinkOutlined />}></Button>
      </Tooltip>
      ,
      <Tooltip key="trackViewUrl" title="View Track">
        <Button type="link" target="_blank" href={track?.trackViewUrl} icon={<LinkOutlined />}></Button>
      </Tooltip>
      ,
      <Tooltip key="collectionViewUrl" title="View Collection">
        <Button type="link" target="_blank" href={track?.collectionViewUrl} icon={<LinkOutlined />}></Button>
      </Tooltip>
    </CustomCard>
  );
}

ITunesCard.propTypes = {
  track: PropTypes.object.isRequired,
  onActionClick: PropTypes.func
};

export default ITunesCard;
