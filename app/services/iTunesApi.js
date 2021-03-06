import { generateApiClient } from '@utils/apiUtils';
const iTunesApi = generateApiClient('itunes');

export const getSongs = (searchQuery) => iTunesApi.get(`/search?term=${searchQuery}`);
export const getTrackDetails = (trackId) => iTunesApi.get(`/lookup?id=${trackId}`);
