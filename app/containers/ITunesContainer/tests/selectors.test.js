import { selectITunesContainerDomain } from '../selectors';

describe('ITunesContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      iTunesContainer: {}
    };
  });

  it('should select the user state', () => {
    expect(selectITunesContainerDomain(mockedState)).toEqual(mockedState.iTunesContainer);
  });
});
