import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs, getTrackDetails } from '../iTunesApi';

describe('iTunesApi tests', () => {
  const searchQuery = 'Infinity';
  it('should make the api call to "/search?term=${searchQuery"', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const itunesData = [
      {
        totalCount: 1,
        results: [{ searchQuery }]
      }
    ];
    mock.onGet(`/search?term=${searchQuery}`).reply(200, itunesData);
    const res = await getSongs(searchQuery);
    expect(res.data).toEqual(itunesData);
  });

  const trackId = '284910350';
  it('should make the api call to "/lookup?id="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const trackData = [
      {
        resultCount: 1,
        items: [{ trackId }]
      }
    ];
    mock.onGet(`/lookup?id=${trackId}`).reply(200, trackData);
    const res = await getTrackDetails(trackId);
    expect(res.data).toEqual(trackData);
  });
});
