/**
 *
 * ITunesCard
 *
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import truncate from 'lodash/truncate';
import { isEmpty } from 'lodash';
import { Card, Popover, Tooltip, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import T from '@components/T';
import If from '@components/If';
import { colors } from '@app/themes';

const CustomCard = styled(Card)`
  && {
    margin: 1.25em 0;
    box-shadow: ${colors.boxShadow};
  }
`;
const CustomAudio = styled.audio`
  margin-bottom: 0.75rem;
`;
const CustomImg = styled.img`
  display: block;
  width: 45%;
  margin: 0.75rem auto;
`;

export function ITunesCard({ track, onActionClick }) {
  const audioRef = useRef(null);
  const {
    artistName,
    trackName,
    collectionName,
    trackPrice,
    primaryGenreName,
    previewUrl,
    artworkUrl100,
    artistViewUrl,
    collectionViewUrl,
    trackViewUrl
  } = track;

  const text = <T id="details" type="subheading" marginBottom={5} />;
  const content = (
    <>
      <If condition={trackPrice}>
        <T id="track-price" values={{ price: trackPrice }} />
      </If>
      <If condition={!isEmpty(primaryGenreName)}>
        <T id="genre-name" values={{ name: primaryGenreName }} />
      </If>
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
      <CustomAudio
        data-testid="audio-element"
        controls
        ref={audioRef}
        src={previewUrl}
        onPlay={() => onActionClick(audioRef)}
      />
      <T
        data-testid="trackName"
        id="track-name"
        values={{ name: truncate(trackName, { length: 28 }) }}
        type="subheading"
        marginBottom={5}
      />
      <T data-testid="artistName" id="artist-name" values={{ name: truncate(artistName, { length: 35 }) }} />
      <If condition={!isEmpty(artistViewUrl)}>
        <Tooltip key="artistViewUrl" title="View Artist">
          <Button type="link" target="_blank" href={track?.artistViewUrl} icon={<LinkOutlined />}></Button>
        </Tooltip>
      </If>
      ,
      <If condition={!isEmpty(trackViewUrl)}>
        <Tooltip key="trackViewUrl" title="View Track">
          <Button type="link" target="_blank" href={track?.trackViewUrl} icon={<LinkOutlined />}></Button>
        </Tooltip>
      </If>
      ,
      <If condition={!isEmpty(collectionViewUrl)}>
        <Tooltip key="collectionViewUrl" title="View Collection">
          <Button type="link" target="_blank" href={track?.collectionViewUrl} icon={<LinkOutlined />}></Button>
        </Tooltip>
      </If>
    </CustomCard>
  );
}

ITunesCard.propTypes = {
  track: PropTypes.object.isRequired,
  onActionClick: PropTypes.func
};

export default ITunesCard;
