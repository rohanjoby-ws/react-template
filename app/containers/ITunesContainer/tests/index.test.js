/**
 *
 * Tests for ITunesContainer
 *
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderProvider } from '@utils/testUtils';
import { ITunesContainerTest as ITunesContainer, mapDispatchToProps } from '../index';
import { iTunesContainerTypes } from '../reducer';

describe('<ITunesContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunesContainer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearITunesSongs on empty change', async () => {
    const getITunesSongsSpy = jest.fn();
    const clearITunesSongsSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ITunesContainer dispatchClearITunesSongs={clearITunesSongsSpy} dispatchITunesSongs={getITunesSongsSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getITunesSongsSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearITunesSongsSpy).toBeCalled();
  });

  it('should call dispatchITunesSongs on change and after enter', async () => {
    const searchQuery = 'Infinity';
    const { getByTestId } = renderProvider(<ITunesContainer dispatchITunesSongs={submitSpy} />);
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar, {
      target: { value: searchQuery }
    });
    await timeout(500);
    expect(submitSpy).toBeCalledWith(searchQuery);

    fireEvent.keyDown(searchBar, {
      key: 'Enter',
      code: 13,
      charCode: 13
    });
    expect(submitSpy).toBeCalledWith(searchQuery);
  });

  it('should call dispatchITunesSongs on submit', async () => {
    const searchQuery = 'Infinity';
    const { getByTestId } = renderProvider(<ITunesContainer dispatchITunesSongs={submitSpy} />);
    fireEvent.keyDown(getByTestId('search-bar'), { keyCode: 13, target: { value: searchQuery } });

    await timeout(500);
    expect(submitSpy).toBeCalledWith(searchQuery);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchITunesSongsSpy = jest.fn();
    const searchQuery = 'Infinity';
    const actions = {
      dispatchITunesSongs: { searchQuery, type: iTunesContainerTypes.REQUEST_GET_I_TUNES_SONGS },
      dispatchClearITunesSongs: { type: iTunesContainerTypes.CLEAR_GET_I_TUNES_SONGS }
    };

    const props = mapDispatchToProps(dispatchITunesSongsSpy);
    props.dispatchITunesSongs(searchQuery);
    expect(dispatchITunesSongsSpy).toHaveBeenCalledWith(actions.dispatchITunesSongs);

    await timeout(500);
    props.dispatchClearITunesSongs();
    expect(dispatchITunesSongsSpy).toHaveBeenCalledWith(actions.dispatchClearITunesSongs);
  });
});
