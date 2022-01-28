import {
  selectITunesContainerDomain,
  selectITunesSearchQuery,
  selectITunesData,
  selectITunesError,
  selectTrackData,
  selectTrackError
} from '../selectors';
import { initialState } from '../reducer';

describe('ITunesContainer selector tests', () => {
  const searchQuery = 'Infinity';
  const iTunesData = { totalCount: 1, results: [{ artistName: 'Jaymes Young' }] };
  const iTunesError = 'There was some error while fetching the song details';

  const trackData = {
    resultsCount: 1,
    results: [
      {
        artistName: 'Dynamix Music',
        trackName: 'Uptown Funk',
        primaryGenreName: 'Fitness & Workout'
      }
    ]
  };
  const trackError = 'There was some error while fetching the track details';

  const mockedState = {
    iTunesContainer: {
      searchQuery,
      iTunesData,
      iTunesError,
      trackData,
      trackError
    }
  };

  it('should select the global state', () => {
    const selector = selectITunesContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });

  it('should select the searchQuery', () => {
    const searchQuerySelector = selectITunesSearchQuery();
    expect(searchQuerySelector(mockedState)).toEqual(searchQuery);
  });

  it('should select iTunesData', () => {
    const iTunesDataSelector = selectITunesData();
    expect(iTunesDataSelector(mockedState)).toEqual(iTunesData);
  });

  it('should select the searchQuery', () => {
    const searchQuerySelector = selectITunesSearchQuery();
    expect(searchQuerySelector(mockedState)).toEqual(searchQuery);
  });

  it('should select iTunesData', () => {
    const iTunesDataSelector = selectITunesData();
    expect(iTunesDataSelector(mockedState)).toEqual(iTunesData);
  });

  it('should select the iTunesError', () => {
    const iTunesErrorSelector = selectITunesError();
    expect(iTunesErrorSelector(mockedState)).toEqual(iTunesError);
  });

  it('should select trackData', () => {
    const trackDataSelector = selectTrackData();
    expect(trackDataSelector(mockedState)).toEqual(trackData);
  });

  it('should select the trackError', () => {
    const trackErrorSelector = selectTrackError();
    expect(trackErrorSelector(mockedState)).toEqual(trackError);
  });
});
