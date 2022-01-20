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
import { Card, Popover } from 'antd';
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
      <CustomAudio
        data-testid="audio-element"
        controls
        ref={audioRef}
        src={track.previewUrl}
        onPlay={() => onActionClick(audioRef)}
      />
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
