export default {
  iTunes: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  iTunesDetails: {
    route: '/track/:trackId',
    props: {
      maxwidth: 900,
      padding: 20
    }
  }
};
