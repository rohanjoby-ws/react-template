/**
 *
 * Tests for ITunesCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl } from '@utils/testUtils';
import { ACTIONS } from '@utils/constants';
import ITunesCard from '../index';
import { mockData } from './mockData';

describe('<ITunesCard />', () => {
  let track, onActionClick;

  beforeEach(() => {
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

  it('should render the song details inside the card', () => {
    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={onActionClick} />);
    expect(getByTestId('collectionName')).toHaveTextContent(track.collectionName);
    expect(getByTestId('trackName')).toHaveTextContent(track.trackName);
    expect(getByTestId('artistName')).toHaveTextContent(track.artistName);
  });

  it('should update progress bar based on song play', () => {
    // const useRefSpy = jest.spyOn(React, 'useRef').mockImplementation(() => {
    //   return { current: { currentTime: 10, duration: 20 } };
    // });

    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={onActionClick} />);
    const progressBar = getByTestId('progress-bar');

    expect(progressBar).toBeInTheDocument();
  });

  it('should call onAction click on play with audioRef and play', (done) => {
    const actionClickHandler = jest.fn();

    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={actionClickHandler} />);

    fireEvent.click(getByTestId('play-button'));

    const audioRef = getByTestId('audio-element');
    expect(actionClickHandler).toBeCalledWith(
      expect.objectContaining({
        current: audioRef
      }),
      ACTIONS.PLAY
    );
    done();
  });

  it('should call onAction click on pause with audioRef and pause', (done) => {
    const actionClickHandler = jest.fn();
    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={actionClickHandler} />);
    const audioRef = getByTestId('audio-element');
    audioRef.paused = false;
    fireEvent.click(getByTestId('pause-button'));
    expect(actionClickHandler).toBeCalledWith(
      expect.objectContaining({
        current: audioRef
      }),
      ACTIONS.PAUSE
    );
    done();
  });
});
