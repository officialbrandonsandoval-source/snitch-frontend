import React from 'react';
import { render } from '@testing-library/react-native';
import RewardDashboardScreen from '../RewardDashboardScreen';

describe('RewardDashboardScreen', () => {
  it('renders Rewards header', () => {
    const { getByText } = render(<RewardDashboardScreen />);
    expect(getByText('Rewards')).toBeTruthy();
  });
});
