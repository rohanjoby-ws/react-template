/**
 *
 * Tests for AllTracksContainer
 *
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderProvider } from '@utils/testUtils';
import { translate } from '@app/components/IntlGlobalProvider';
import { AllTracksContainerTest as AllTracksContainer, mapDispatchToProps } from '../index';
import { iTunesContainerTypes } from '../../reducer';

describe('<ITunesContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<AllTracksContainer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearITunesSongs on empty change', async () => {
    const getITunesSongsSpy = jest.fn();
    const clearITunesSongsSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <AllTracksContainer dispatchClearITunesSongs={clearITunesSongsSpy} dispatchITunesSongs={getITunesSongsSpy} />
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
    const { getByTestId } = renderProvider(<AllTracksContainer dispatchITunesSongs={submitSpy} />);
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
    const { getByTestId } = renderProvider(<AllTracksContainer dispatchITunesSongs={submitSpy} />);
    fireEvent.keyDown(getByTestId('search-bar'), { keyCode: 13, target: { value: searchQuery } });

    await timeout(500);
    expect(submitSpy).toBeCalledWith(searchQuery);
  });

  it('should  dispatchiTunesSongs on update on mount if searchQuery is already persisted', async () => {
    const searchQuery = 'Infinity';
    renderProvider(<AllTracksContainer searchQuery={searchQuery} iTunesData={null} dispatchITunesSongs={submitSpy} />);

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

  it('should render default error message when search goes wrong', () => {
    const defaultError = translate('something_went_wrong');
    const { getByTestId } = renderProvider(<AllTracksContainer iTunesError={defaultError} />);
    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(getByTestId('error-message').textContent).toBe(defaultError);
  });

  it('should render the data when loading becomes false', () => {
    const iTunesData = { totalCount: 1, results: [{ artistName: 'Jaymes Young' }] };
    const { getByTestId } = renderProvider(
      <AllTracksContainer iTunesData={iTunesData} dispatchITunesSongs={submitSpy} />
    );
    expect(getByTestId('for')).toBeInTheDocument();
  });

  it('should render exact number of iTuneCards as per totalCount in result', () => {
    const totalCount = 2;
    const iTunesData = {
      totalCount,
      results: [
        {
          artistName: 'Mark Ronson',
          trackName: 'Uptown Funk (feat. Bruno Mars)',
          primaryGenreName: 'Pop'
        },
        {
          artistName: 'Dynamix Music',
          trackName: 'Uptown Funk',
          primaryGenreName: 'Fitness & Workout'
        }
      ]
    };
    const { getAllByTestId } = renderProvider(
      <AllTracksContainer iTunesData={iTunesData} dispatchITunesSongs={submitSpy} />
    );
    expect(getAllByTestId('itunes-card').length).toBe(totalCount);
  });

  it('should render Skeleton Comp when "loading" is true', async () => {
    const searchQuery = 'Infinity';
    const { getByTestId, baseElement } = renderProvider(
      <AllTracksContainer dispatchITunesSongs={submitSpy} searchQuery={searchQuery} />
    );
    fireEvent.change(getByTestId('search-bar'), { target: { value: searchQuery } });
    await timeout(500);
    expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(1);
  });

  it('should test play/pause functionality', async () => {
    const iTunesData = { totalCount: 2, results: [{ artistName: 'Jaymes' }, { artistName: 'Young' }] };
    const { getAllByTestId } = renderProvider(
      <AllTracksContainer iTunesData={iTunesData} dispatchITunesSongs={submitSpy} />
    );
    const players = getAllByTestId('itunes-card');
    players.forEach((item) => {
      fireEvent.play(item.querySelector('audio'));
    });
    await timeout(500);
    expect(players[0].querySelector('audio')).toHaveProperty('paused', true);
  });
});
