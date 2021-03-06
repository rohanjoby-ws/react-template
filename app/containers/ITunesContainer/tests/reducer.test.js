import { iTunesContainerReducer, iTunesContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(iTunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_SONGS is dispatched', () => {
    const searchQuery = 'Infinity';
    const expectedResult = { ...state, searchQuery };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.REQUEST_GET_I_TUNES_SONGS,
        searchQuery
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the song data is present when FETCH_SONGS_SUCCESS is dispatched', () => {
    const data = { totalCount: 1, results: [{ artistName: 'Jaymes Young' }] };
    const expectedResult = { ...state, iTunesData: data };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.SUCCESS_GET_I_TUNES_SONGS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the iTuneErrorMessage has some data when FETCH_SONGS_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, iTunesError: error };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.FAILURE_GET_I_TUNES_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when CLEAR_I_TUNES is dispatched', () => {
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.CLEAR_GET_I_TUNES_SONGS
      })
    ).toEqual(initialState);
  });

  it('should ensure that the track data is present when FETCH_DETAILS_SUCCESS is dispatched', () => {
    const data = { resultsCount: 1, results: [{ artistName: 'Jaymes Young' }] };
    const expectedResult = { ...state, trackData: data };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.SUCCESS_GET_TRACK_DATA,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the trackDetailsErrorMessage has some data when FETCH_DETAILS_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, trackError: error };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.FAILURE_GET_TRACK_DATA,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when CLEAR_DETAILS is dispatched', () => {
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.CLEAR_GET_TRACK_DATA
      })
    ).toEqual(initialState);
  });
});
