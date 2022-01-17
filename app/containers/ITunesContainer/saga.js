import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@services/iTunesApi';
import { iTunesContainerTypes, iTunesContainerCreators } from './reducer';

const { REQUEST_GET_I_TUNES_SONGS } = iTunesContainerTypes;
const { successGetITunesSongs, failureGetITunesSongs } = iTunesContainerCreators;

export function* getITunesSongs(action) {
  const response = yield call(getSongs, action.searchQuery);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetITunesSongs(data));
  } else {
    yield put(failureGetITunesSongs(data));
  }
}
// Individual exports for testing
export default function* iTunesContainerSaga() {
  yield takeLatest(REQUEST_GET_I_TUNES_SONGS, getITunesSongs);
}
