import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunesContainer state domain
 */

const selectITunesContainerDomain = () => initialState;

const makeSelectITunesContainer = () => createSelector(selectITunesContainerDomain, (substate) => substate);

export default makeSelectITunesContainer;
export { selectITunesContainerDomain };
