import React from 'react';
import { render } from '@testing-library/react-native';
import SubmissionReviewScreen from '../SubmissionReviewScreen';

describe('SubmissionReviewScreen', () => {
  it('renders Review Submission header', () => {
    const { getByText } = render(<SubmissionReviewScreen />);
    expect(getByText(/Review Submission/i)).toBeTruthy();
  });
});
