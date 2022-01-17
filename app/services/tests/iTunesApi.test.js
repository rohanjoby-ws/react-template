import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs } from '../iTunesApi';

describe('iTunesApi tests', () => {
  const searchQuery = 'Infinity';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const itunesData = [
      {
        totalCount: 1,
        items: [{ searchQuery }]
      }
    ];
    mock.onGet(`/search?term=${searchQuery}`).reply(200, itunesData);
    const res = await getSongs(searchQuery);
    expect(res.data).toEqual(itunesData);
  });
});
