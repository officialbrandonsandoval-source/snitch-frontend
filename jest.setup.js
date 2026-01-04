import 'react-native-gesture-handler/jestSetup';

jest.mock('expo-av', () => ({
  Audio: {
    requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  },
}));

jest.mock('expo-camera', () => ({
  useCameraPermissions: jest.fn(() => [{ status: 'granted' }, jest.fn()]),
}));

jest.mock('expo-location', () => ({
  useForegroundPermissions: jest.fn(() => [{ status: 'granted' }, jest.fn()]),
}));
