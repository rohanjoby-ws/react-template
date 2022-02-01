describe('Tests for baseUrl method in history', () => {
  it('should not return the branch-name as part of the baseUrl when the ENVIRONMENT_NAME is not uat', () => {
    const featName = `/feat/uat-on-pr`;
    const location = window.location;
    delete window.location;
    window.location = { pathname: `${featName}/` };
    process.env.ENVIRONMENT_NAME = 'dev';
    const { getBaseUrl } = require('../history');

    expect(getBaseUrl()).not.toBe(featName);
    window.location = location;
  });

  it('should return the branch-name as part of the baseUrl when the ENVIRONMENT_NAME is uat', () => {
    const featName = `/feat/uat-on-pr`;
    const location = window.location;
    delete window.location;
    window.location = { pathname: `${featName}/` };
    process.env.ENVIRONMENT_NAME = 'uat';
    const { getBaseUrl } = require('../history');

    expect(getBaseUrl()).toBe(featName);
    window.location = location;
  });
});
