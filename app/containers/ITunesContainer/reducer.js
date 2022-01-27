/*
 *
 * ITunesContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = {
  searchQuery: null,
  iTunesData: {},
  iTunesError: null,

  trackID: null,
  trackData: {},
  trackError: null
};

export const { Types: iTunesContainerTypes, Creators: iTunesContainerCreators } = createActions({
  requestGetITunesSongs: ['searchQuery'],
  successGetITunesSongs: ['data'],
  failureGetITunesSongs: ['error'],
  clearGetITunesSongs: {},

  //requestGetTrackData: ['trackID'],
  successGetTrackData: ['data'],
  failureGetTrackData: ['error'],
  clearGetTrackData: {}
});

export const iTunesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case iTunesContainerTypes.REQUEST_GET_I_TUNES_SONGS:
        draft.searchQuery = action.searchQuery;
        break;
      case iTunesContainerTypes.CLEAR_GET_I_TUNES_SONGS:
        draft.searchQuery = null;
        draft.iTunesError = null;
        draft.iTunesData = {};
        break;
      case iTunesContainerTypes.SUCCESS_GET_I_TUNES_SONGS:
        draft.iTunesData = action.data;
        break;
      case iTunesContainerTypes.FAILURE_GET_I_TUNES_SONGS:
        draft.iTunesError = get(action.error, 'message', 'something_went_wrong');
        break;

      // case iTunesContainerTypes.REQUEST_GET_TRACK_DATA:
      //   draft.trackId = action.trackID;
      //   break;
      case iTunesContainerTypes.CLEAR_GET_TRACK_DATA:
        draft.trackId = null;
        draft.trackError = null;
        draft.trackData = {};
        break;
      case iTunesContainerTypes.SUCCESS_GET_TRACK_DATA:
        draft.trackData = action.data;
        break;
      case iTunesContainerTypes.FAILURE_GET_TRACK_DATA:
        draft.trackError = get(action.error, 'message', 'something_went_wrong');
        break;

      default:
        return state;
    }
  });
