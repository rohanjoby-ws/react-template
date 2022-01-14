import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getRepos, getSongs } from '../iTunesApi';

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

  const repositoryName = 'mac';
  it('should make the api call to "/search/repositories?q="', async () => {
    const mock = new MockAdapter(getApiClient('github').axiosInstance);
    const repoData = [
      {
        totalCount: 1,
        items: [{ repositoryName }]
      }
    ];
    mock.onGet(`/search/repositories?q=${repositoryName}`).reply(200, repoData);
    const res = await getRepos(repositoryName);
    expect(res.data).toEqual(repoData);
  });
});
