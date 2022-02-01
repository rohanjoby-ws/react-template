import { createBrowserHistory } from 'history';
import routeConstants from '@utils/routeConstants';

const routes = Object.keys(routeConstants);
const pathname = window.location.pathname;

let bUrl = '';
if (process.env.ENVIRONMENT_NAME === 'uat') {
  routes.forEach((routeKey) => {
    const route = routeConstants[routeKey].route;
    if (pathname.includes(route)) {
      if (pathname.substring(pathname.length - route.length, pathname.length) === route) {
        bUrl = pathname.substring(0, pathname.length - route.length);
      }
      if (pathname.substring(pathname.length - route.length, pathname.length - 1) === `${route}/`) {
        bUrl = pathname.substring(0, pathname.length - route.length - 1);
      }
    }
  });
}

const history = createBrowserHistory({ basename: bUrl });
export default history;
