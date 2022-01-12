/*
 *
 * ITunesContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {};

export const { Types: iTunesContainerTypes, Creators: iTunesContainerCreators } = createActions({
  defaultAction: ['somePayload']
});

/* eslint-disable default-case, no-param-reassign */
export const iTunesContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case iTunesContainerTypes.DEFAULT_ACTION:
        return { ...state, somePayload: action.somePayload };
      default:
        return state;
    }
  });

export default iTunesContainerReducer;
