import React from 'react';
import { render } from '@testing-library/react-native';
import TimelineScreen from '../TimelineScreen';

describe('TimelineScreen', () => {
  it('renders Incident Timeline header', () => {
    const { getByText } = render(<TimelineScreen />);
    expect(getByText(/Incident Timeline/i)).toBeTruthy();
  });
});
