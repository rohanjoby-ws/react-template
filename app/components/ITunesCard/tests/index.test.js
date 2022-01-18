/**
 *
 * Tests for ITunesCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl, timeout } from '@utils/testUtils';
import ITunesCard from '../index';

describe('<ITunesCard />', () => {
  let track, onActionClick;

  beforeEach(() => {
    track = {
      artistName: 'Mark Ronson',
      trackName: 'Uptown Funk',
      collectionName: 'Uptown Special',
      trackPrice: 128,
      primaryGenreName: 'Pop',
      previewUrl: 'preview-url',
      artworkUrl100: 'album-art-url'
    };
    onActionClick = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ITunesCard track={track} onActionClick={onActionClick} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ITunesCard component', () => {
    const { getAllByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={onActionClick} />);
    expect(getAllByTestId('i-tunes-card').length).toBe(1);
  });

  it('should render the song details inside the card', () => {
    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={onActionClick} />);
    expect(getByTestId('collectionName')).toHaveTextContent(track.collectionName);
    expect(getByTestId('trackName')).toHaveTextContent(track.trackName);
    expect(getByTestId('artistName')).toHaveTextContent(track.artistName);
  });

  it('should play/pause music when play/pause button is clicked', async () => {
    const pauseSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const playSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});

    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={onActionClick} />);
    fireEvent.click(getByTestId('playButton'));

    await timeout(500);
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(pauseSpy).toHaveBeenCalledTimes(0);

    fireEvent.click(getByTestId('pauseButton'));

    await timeout(500);
    expect(pauseSpy).toHaveBeenCalledTimes(1);
  });
});
