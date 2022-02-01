describe('Tests for baseUrl method in history', () => {
  let baseUrl;
  let route;
  let pathname;

  const OLD_ENV = process.env;
  beforeEach(() => {
    baseUrl = '';
    process.env = { ...OLD_ENV };
  });
  // afterAll(() => {
  //   process.env = OLD_ENV;
  // });

  it('should load / route', () => {
    process.env.ENVIRONMENT_NAME = 'uat';
    route = '/';
    pathname = '/feat/uat-on-pr/';
    if (pathname.substring(pathname.length - route.length, pathname.length) === route) {
      baseUrl = pathname.substring(0, pathname.length - route.length);
    }
    if (pathname.substring(pathname.length - route.length, pathname.length - 1) === `${route}/`) {
      baseUrl = pathname.substring(0, pathname.length - route.length - 1);
    }
    // baseUrl = pathname.substring(0, pathname.length - route.length);
    expect(baseUrl).toEqual('/feat/uat-on-pr');
    expect(process.env.ENVIRONMENT_NAME).toEqual('uat');
  });
  it('should load /fea route', () => {
    process.env.ENVIRONMENT_NAME = 'uat';
    route = '/tracks/982536514732';
    pathname = '/feat/uat-on-pr/tracks/982536514732';
    if (pathname.substring(pathname.length - route.length, pathname.length) === route) {
      baseUrl = pathname.substring(0, pathname.length - route.length);
    }
    if (pathname.substring(pathname.length - route.length, pathname.length - 1) === `${route}/`) {
      baseUrl = pathname.substring(0, pathname.length - route.length - 1);
    }
    // baseUrl = pathname.substring(0, pathname.length - route.length - 1);
    expect(baseUrl).toEqual('/feat/uat-on-pr');
    expect(process.env.ENVIRONMENT_NAME).toEqual('uat');
  });
});
