/**
 *
 * Tests for ITunesCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl, timeout } from '@utils/testUtils';
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

  // it('should update progress bar based on song play', () => {
  //   // const useRefSpy = jest.spyOn(React, 'useRef').mockImplementation(() => {
  //   //   return { current: { currentTime: 10, duration: 20 } };
  //   // });

  //   const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={onActionClick} />);
  //   const progressBar = getByTestId('progress-bar');

  //   expect(progressBar).toBeInTheDocument();
  // });

  it('should call onAction click on play and pause', async () => {
    const refSpy = jest
      .spyOn(React, 'useRef')
      .mockReturnValue({ current: <audio data-testid="audio-element" src={mockData.previewUrl} /> });

    const actClick = jest.fn();
    actClick.mockReturnValue('hi')

    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={actClick} />);

    fireEvent.click(getByTestId('play-button'));
    // expect(onActionClick).toBeCalled();
    expect(actClick).toBeCalledWith({
      action: ACTIONS.PLAY,
      audioRef: refSpy()
    });

    fireEvent.click(getByTestId('pause-button'));
    // expect(onActionClick).toBeCalled();
    expect(actClick).toBeCalledWith({
      action: ACTIONS.PAUSE,
      audioRef: { current: <audio data-testid="audio-element" src={mockData.previewUrl} /> }
    });
  });
});

/*
    actClick.mockReturnValue({
      action: ACTIONS.PAUSE,
      audioRef: { current: <audio data-testid="audio-element" src={mockData.previewUrl} /> }
    });
*/
/*it('should play/pause music when play/pause button is clicked', async () => {
    const pauseSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const playSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});
    const handleActionClick = jest.fn();

    const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={handleActionClick} />);

    fireEvent.click(getByTestId('play-button'));
   
    await timeout(1000);
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(pauseSpy).toHaveBeenCalledTimes(0);

    fireEvent.click(getByTestId('pause-button'));

    await timeout(1000);
    expect(pauseSpy).toHaveBeenCalledTimes(1);
  });*/

/*

it('should play/pause music when play/pause button is clicked', async () => {
  const pauseSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  const playSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});
  const useRefSpy = jest.spyOn(React, 'useRef').mockImplementation(() => {
    return { current: <audio data-testid="audio-element" src="preview-url" /> };
  });

  // const handleActionClick = jest.fn(()=>useRefSpy);

  function mockGetRef(ref) {
    return { current: <audio data-testid="audio-element" src="preview-url" /> };
  }
  const refMock = jest.spyOn(React, 'useRef').mockImplementation(mockGetRef);

  const r = jest.fn();
  r.mockReturnValueOnce({ current: <audio data-testid="audio-element" src="preview-url" /> });

  const handleActionClick = jest.fn();
 //handleActionClick.mockReturnValue('on click');

  const { getByTestId } = renderWithIntl(<ITunesCard track={track} onActionClick={handleActionClick} />);

  fireEvent.click(getByTestId('play-button'));
  const el = getByTestId('audio-element');

  //  const useRefSpy = jest.fn({ current: <audio data-testid="audio-element" src="preview-url" /> });

  await timeout(1000);
  expect(playSpy).toHaveBeenCalledTimes(1);
  expect(pauseSpy).toHaveBeenCalledTimes(0);
  //expect(handleActionClick).toHaveBeenCalledWith(useRefSpy);

  // expect(handleActionClick).toHaveBeenCalledWith(useRefSpy);
  // expect(handleActionClick).toHaveBeenCalledWith({
  //   current: <audio data-testid="audio-element" src="preview-url" />
  // });

  fireEvent.click(getByTestId('pause-button'));

  await timeout(1000);
  expect(pauseSpy).toHaveBeenCalledTimes(1);
})*/
