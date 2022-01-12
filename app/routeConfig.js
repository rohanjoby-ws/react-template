import NotFound from '@containers/NotFoundPage/Loadable';
import ITunesContainer from '@containers/ITunesContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  iTunes: {
    component: ITunesContainer,
    ...routeConstants.repos
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
