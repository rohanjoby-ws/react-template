import NotFound from '@containers/NotFoundPage/Loadable';
import AllTracksContainer from '@containers/ITunesContainer/AllTracksContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  iTunes: {
    component: AllTracksContainer,
    ...routeConstants.repos
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
