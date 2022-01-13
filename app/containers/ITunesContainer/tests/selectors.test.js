import makeSelectITunesContainer, { selectITunesContainerDomain } from '../selectors';

describe('ITunesContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      iTunesContainer: {}
    };
  });
  it('should select the user state', () => {
    const iTunesContainerSelector = makeSelectITunesContainer();
    expect(iTunesContainerSelector(mockedState)).toEqual(mockedState.iTunesContainer);
  });
  it('should select the initial state', () => {
    expect(selectITunesContainerDomain(mockedState)).toEqual(mockedState.iTunesContainer);
  });
});
