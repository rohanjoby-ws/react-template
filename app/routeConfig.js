import NotFound from '@containers/NotFoundPage/Loadable';
import AllTracksContainer from '@containers/ITunesContainer/AllTracksContainer/Loadable';
import TrackDetailsContainer from '@containers/ITunesContainer/TrackDetailsContainer/Loadable';
import routeConstants from '@utils/routeConstants';

export const routeConfig = {
  iTunes: {
    component: AllTracksContainer,
    ...routeConstants.iTunes
  },
  iTunesDetails: {
    component: TrackDetailsContainer,
    ...routeConstants.iTunesDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
