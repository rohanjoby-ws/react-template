/**
 *
 * Tests for ITunesCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl } from '@utils/testUtils';
import { translate } from '@app/components/IntlGlobalProvider';
import ITunesCard from '../index';
import { mockData } from './mockData';

describe('<ITunesCard />', () => {
  let track, onActionClick;

  beforeEach(() => {
    jest.useFakeTimers();
    track = mockData;
    onActionClick = jest.fn();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ITunesCard track={track} onActionClick={onActionClick} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ITunesCard component', () => {
    const { getAllByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={onActionClick} />);
    expect(getAllByTestId('itunes-card').length).toBe(1);
  });

  it('should render the song details inside the card', async () => {
    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={onActionClick} />);

    expect(getByTestId('collection-name')).toHaveTextContent(track.collectionName);
    expect(getByTestId('track-name')).toHaveTextContent(track.trackName);
    expect(getByTestId('artist-name')).toHaveTextContent(track.artistName);
    expect(getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('should render the unavailable messages in case any props are unavailable or have falsy values', () => {
    const collectionNameUnavailable = translate('collection_name_unavailable');
    const trackNameUnavailable = translate('track_name_unavailable');
    const artistNameUnavailable = translate('artist_unavailable');

    const { getByTestId } = renderWithIntl(<ITunesCard onActionClick={onActionClick} />);

    expect(getByTestId('collection-unavailable')).toHaveTextContent(collectionNameUnavailable);
    expect(getByTestId('track-unavailable')).toHaveTextContent(trackNameUnavailable);
    expect(getByTestId('artist-unavailable')).toHaveTextContent(artistNameUnavailable);
  });

  it('should display progress based on the duration and currentTime of the track', async () => {
    const actionClickHandler = jest.fn();

    const duration = 10.0;
    const currentTime = 1.0;
    const percent = (currentTime / duration) * 100;
    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={actionClickHandler} />);

    fireEvent.click(getByTestId('play-button'));

    const audioRef = getByTestId('audio-element');
    audioRef.currentTime = currentTime;
    audioRef.duration = duration;

    expect(actionClickHandler).toBeCalledWith(
      expect.objectContaining({
        current: audioRef
      })
    );
    jest.runOnlyPendingTimers();
    expect(getByTestId('progress-bar').querySelector('.ant-progress-bg')).toHaveStyle(`width: ${percent}%`);
  });

  it('should call onAction click on play with audioRef and play', () => {
    const actionClickHandler = jest.fn();
    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={actionClickHandler} />);

    const audioRef = getByTestId('audio-element');
    fireEvent.click(getByTestId('play-button'));

    expect(actionClickHandler).toBeCalledWith(
      expect.objectContaining({
        current: audioRef
      })
    );
    expect(audioRef).not.toHaveAttribute('paused');
  });

  it('should call onAction click on pause with audioRef and pause', async () => {
    const actionClickHandler = jest.fn();
    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={actionClickHandler} />);
    const audioRef = getByTestId('audio-element');

    fireEvent.click(getByTestId('pause-button'));
    expect(actionClickHandler).toBeCalledWith(
      expect.objectContaining({
        current: audioRef
      })
    );
    expect(audioRef).toHaveProperty('paused', true);
  });
});
