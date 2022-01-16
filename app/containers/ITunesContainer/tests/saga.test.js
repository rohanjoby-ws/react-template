/**
 * Test iTunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@services/iTunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import iTunesContainerSaga, { getITunesSongs } from '../saga';
import { iTunesContainerTypes } from '../reducer';

describe('ITunesContainer saga tests', () => {
  const generator = iTunesContainerSaga();
  const searchQuery = 'Infinity';
  let getITunesSongGenerator = getITunesSongs({ searchQuery });

  it('should start task to watch for REQUEST_GET_I_TUNES_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesContainerTypes.REQUEST_GET_I_TUNES_SONGS, getITunesSongs));
  });

  it('should ensure that the action FAILURE_GET_I_TUNES_SONGS is dispatched when the api call fails', () => {
    const res = getITunesSongGenerator.next().value;
    expect(res).toEqual(call(getSongs, searchQuery));
    const errorResponse = {
      errorMessage: 'There was an error while fetching song information.'
    };
    expect(getITunesSongGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: iTunesContainerTypes.FAILURE_GET_I_TUNES_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_I_TUNES_SONGS is dispatched when the api call succeeds', () => {
    getITunesSongGenerator = getITunesSongs({ searchQuery });
    const res = getITunesSongGenerator.next().value;
    expect(res).toEqual(call(getSongs, searchQuery));
    const iTunesResponse = {
      totalCount: 1,
      items: [{ artistName: 'Jaymes Young' }]
    };
    expect(getITunesSongGenerator.next(apiResponseGenerator(true, iTunesResponse)).value).toEqual(
      put({
        type: iTunesContainerTypes.SUCCESS_GET_I_TUNES_SONGS,
        data: iTunesResponse
      })
    );
  });
});
