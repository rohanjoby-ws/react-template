import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { get } from 'lodash';
/**
 * Direct selector to the iTunesContainer state domain
 */

export const selectITunesContainerDomain = (state) => state.iTunesContainer || initialState;

export const selectITunesContainer = () => createSelector(selectITunesContainerDomain, (substate) => substate);

export const selectITunesSearchQuery = () =>
  createSelector(selectITunesContainerDomain, (substate) => get(substate, 'searchQuery'));

export const selectITunesData = () =>
  createSelector(selectITunesContainerDomain, (substate) => get(substate, 'iTunesData'));

export const selectITunesError = () =>
  createSelector(selectITunesContainerDomain, (substate) => get(substate, 'iTunesError'));

export const selectTrackID = () => createSelector(selectITunesContainerDomain, (substate) => get(substate, 'trackID'));

export const selectTrackData = () =>
  createSelector(selectITunesContainerDomain, (substate) => get(substate, 'trackData'));

export const selectTrackError = () =>
  createSelector(selectITunesContainerDomain, (substate) => get(substate, 'trackError'));

export default selectITunesContainer;
