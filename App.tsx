import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import IncidentRecordingScreen from './src/screens/incident/IncidentRecordingScreen';
import EvidenceUploadScreen from './src/screens/incident/EvidenceUploadScreen';
import RewardDashboardScreen from './src/screens/incident/RewardDashboardScreen';
import SettingsScreen from './src/screens/incident/SettingsScreen';
import SubmissionReviewScreen from './src/screens/incident/SubmissionReviewScreen';
import TimelineScreen from './src/screens/incident/TimelineScreen';
import { COLORS } from './src/theme';

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  IncidentRecording: undefined;
  EvidenceUpload: undefined;
  RewardDashboard: undefined;
  Settings: undefined;
  SubmissionReview: undefined;
  Timeline: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#101014',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
          },
          headerTintColor: COLORS.primaryHighlight,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Incident History' }} />
        <Stack.Screen name="IncidentRecording" component={IncidentRecordingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EvidenceUpload" component={EvidenceUploadScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RewardDashboard" component={RewardDashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SubmissionReview" component={SubmissionReviewScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Timeline" component={TimelineScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
