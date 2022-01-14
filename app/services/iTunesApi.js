import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');
const iTunesApi = generateApiClient('itunes');

export const getRepos = (repoName) => repoApi.get(`/search/repositories?q=${repoName}`);
export const getSongs = (searchQuery) => iTunesApi.get(`/search?term=${searchQuery}`);
