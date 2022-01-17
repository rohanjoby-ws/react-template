import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunesContainer state domain
 */

export const selectITunesContainerDomain = () => initialState;

export const makeSelectITunesContainer = () => createSelector(selectITunesContainerDomain, (substate) => substate);
export default makeSelectITunesContainer;
