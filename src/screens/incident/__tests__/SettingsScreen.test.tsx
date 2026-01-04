import React from 'react';
import { render } from '@testing-library/react-native';
import SettingsScreen from '../SettingsScreen';

describe('SettingsScreen', () => {
  it('renders Settings header', () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText(/Settings/i)).toBeTruthy();
  });
});
