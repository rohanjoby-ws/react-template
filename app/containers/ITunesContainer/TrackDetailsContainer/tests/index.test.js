/**
 *
 * Tests for TrackDetailsContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { TrackDetailsContainerTest as TrackDetailsContainer } from '../index';

describe('<TrackDetailsContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackDetailsContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
