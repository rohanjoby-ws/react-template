import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs, getTrackDetails } from '@services/iTunesApi';
import { iTunesContainerTypes, iTunesContainerCreators } from './reducer';

const { REQUEST_GET_I_TUNES_SONGS, REQUEST_GET_TRACK_DATA } = iTunesContainerTypes;
const { successGetITunesSongs, failureGetITunesSongs, successGetTrackData, failureGetTrackData } =
  iTunesContainerCreators;

export function* getITunesSongs(action) {
  const response = yield call(getSongs, action.searchQuery);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetITunesSongs(data));
  } else {
    yield put(failureGetITunesSongs(data));
  }
}
export function* getITuneTrackDetails(action) {
  const response = yield call(getTrackDetails, action.trackID);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackData(data));
  } else {
    yield put(failureGetTrackData(data));
  }
}
// Individual exports for testing
export default function* iTunesContainerSaga() {
  yield takeLatest(REQUEST_GET_I_TUNES_SONGS, getITunesSongs);
  yield takeLatest(REQUEST_GET_TRACK_DATA, getITuneTrackDetails);
}
