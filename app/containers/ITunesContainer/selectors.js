import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { get } from 'lodash';
/**
 * Direct selector to the iTunesContainer state domain
 */

export const selectITunesContainerDomain = (state) => state.iTunesContainer || initialState;

export const selectITunesSearchQuery = () =>
  createSelector(selectITunesContainerDomain, (substate) => get(substate, 'searchQuery'));

export const selectITunesData = () =>
  createSelector(selectITunesContainerDomain, (substate) => get(substate, 'iTunesData'));

export const selectITunesError = () =>
  createSelector(selectITunesContainerDomain, (substate) => get(substate, 'iTunesError'));
