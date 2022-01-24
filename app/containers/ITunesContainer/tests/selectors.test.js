import {
  selectITunesContainerDomain,
  selectITunesSearchQuery,
  selectITunesData,
  selectITunesError
} from '../selectors';
import { initialState } from '../reducer';

describe('ITunesContainer selector tests', () => {
  let mockedState;
  let searchQuery;
  let iTunesData;
  let iTunesError;

  beforeEach(() => {
    searchQuery = 'Infinity';
    iTunesData = { totalCount: 1, results: [{ artistName: 'Jaymes Young' }] };
    iTunesError = 'There was some error while fetching the song details';

    mockedState = {
      iTunesContainer: {
        searchQuery,
        iTunesData,
        iTunesError
      }
    };
  });
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
});
