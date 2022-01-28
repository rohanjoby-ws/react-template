/**
 * Test iTunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs, getTrackDetails } from '@services/iTunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import iTunesAllTracksSaga, { getITunesSongs, getITuneTrackDetails, iTunesTrackDetailsSaga } from '../saga';
import { iTunesContainerTypes } from '../reducer';

describe('ITunesContainer saga tests', () => {
  const generatorAllTracks = iTunesAllTracksSaga();
  const generatorTrackDetails = iTunesTrackDetailsSaga();

  const searchQuery = 'Infinity';
  let getITunesSongGenerator = getITunesSongs({ searchQuery });

  const trackId = '956024318';
  let getTrackDetailsGenerator = getITuneTrackDetails({ trackId });

  it('should start task to watch for REQUEST_GET_I_TUNES_SONGS action', () => {
    expect(generatorAllTracks.next().value).toEqual(
      takeLatest(iTunesContainerTypes.REQUEST_GET_I_TUNES_SONGS, getITunesSongs)
    );
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

  //trackDetails
  it('should start task to watch for REQUEST_GET_TRACK_DATA action', () => {
    expect(generatorTrackDetails.next().value).toEqual(
      takeLatest(iTunesContainerTypes.REQUEST_GET_TRACK_DATA, getITuneTrackDetails)
    );
  });

  it('should ensure that the action FAILURE_GET_TRACK_DATA is dispatched when the api call fails', () => {
    const res = getTrackDetailsGenerator.next().value;
    expect(res).toEqual(call(getTrackDetails, trackId));
    const errorResponse = {
      errorMessage: 'There was an error while fetching song details.'
    };
    expect(getTrackDetailsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: iTunesContainerTypes.FAILURE_GET_TRACK_DATA,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_DATA is dispatched when the api call succeeds', () => {
    getTrackDetailsGenerator = getITuneTrackDetails({ trackId });
    const res = getTrackDetailsGenerator.next().value;
    expect(res).toEqual(call(getTrackDetails, trackId));
    const trackDetailsResponse = {
      totalCount: 1,
      items: [{ artistName: 'Jaymes Young' }]
    };
    expect(getTrackDetailsGenerator.next(apiResponseGenerator(true, trackDetailsResponse)).value).toEqual(
      put({
        type: iTunesContainerTypes.SUCCESS_GET_TRACK_DATA,
        data: trackDetailsResponse
      })
    );
  });
});
