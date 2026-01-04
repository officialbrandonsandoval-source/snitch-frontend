import React from 'react';
import { render } from '@testing-library/react-native';
import IncidentRecordingScreen from '../IncidentRecordingScreen';

describe('IncidentRecordingScreen', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<IncidentRecordingScreen />);
    expect(getByText('Record Incident')).toBeTruthy();
  });
});
