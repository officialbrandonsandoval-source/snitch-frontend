import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { useForegroundPermissions as useLocationPermissions } from "expo-location";
import * as Audio from "expo-av";
import { COLORS, globalStyles } from "../../theme";

const ICONS = {
  UserCircleIcon: '👤',
  CameraIcon: '📷',
  MicrophoneIcon: '🎤',
  MapPinIcon: '📍',
  BellIcon: '🔔',
};

function Header() {
  return (
    <View style={globalStyles.header}>
      <Text style={globalStyles.headerTitle}>Settings</Text>
    </View>
  );
}

interface ProfileCardProps {
  name: string;
  status: string;
}
function ProfileCard({ name, status }: ProfileCardProps) {
  return (
    <View style={styles.profileCard}>
      <Text style={{ fontSize: 48, color: COLORS.primaryHighlight }}>{ICONS.UserCircleIcon}</Text>
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>{name}</Text>
        <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>{status}</Text>
      </View>
    </View>
  );
}

interface PermissionToggleProps {
  label: string;
  icon: keyof typeof ICONS;
  enabled: boolean;
  onToggle: () => void;
}
function PermissionToggle({ label, icon, enabled, onToggle }: PermissionToggleProps) {
  return (
    <View style={styles.toggleRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 24, color: COLORS.primaryHighlight }}>{ICONS[icon]}</Text>
        <Text style={{ fontSize: 14, color: '#fff' }}>{label}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.toggleSwitch,
          {
            borderColor: enabled ? COLORS.primary : COLORS.border,
            backgroundColor: enabled ? COLORS.primary : COLORS.surface
          }
        ]}
        onPress={onToggle}
        accessibilityLabel={`Toggle ${label}`}
      >
        <View style={[
          styles.toggleKnob,
          { marginLeft: enabled ? 24 : 4 }
        ]} />
      </TouchableOpacity>
    </View>
  );
}

interface NotificationPreferencesProps {
  enabled: boolean;
  onToggle: () => void;
}
function NotificationPreferences({ enabled, onToggle }: NotificationPreferencesProps) {
  return (
    <View style={styles.toggleRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 24, color: COLORS.primaryHighlight }}>{ICONS.BellIcon}</Text>
        <Text style={{ fontSize: 14, color: '#fff' }}>Notifications</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.toggleSwitch,
          {
            borderColor: enabled ? COLORS.primary : COLORS.border,
            backgroundColor: enabled ? COLORS.primary : COLORS.surface
          }
        ]}
        onPress={onToggle}
        accessibilityLabel="Toggle Notifications"
      >
        <View style={[
          styles.toggleKnob,
          { marginLeft: enabled ? 24 : 4 }
        ]} />
      </TouchableOpacity>
    </View>
  );
}

function PolicyLinks() {
  return (
    <View style={{ marginTop: 32 }}>
      <Text style={{ color: COLORS.primaryHighlight, fontSize: 12, marginBottom: 4 }}>Privacy Policy</Text>
      <Text style={{ color: COLORS.primaryHighlight, fontSize: 12 }}>Terms of Service</Text>
    </View>
  );
}

export default function SettingsScreen() {
  const [camera, setCamera] = useState(true);
  const [mic, setMic] = useState(true);
  const [location, setLocation] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: 'Agent', status: 'Active' });

  // Fetch settings from backend (Mocked for now as backend might not be reachable)
  useEffect(() => {
    // setLoading(true);
    // axios.get("/api/v1/users/me")
    //   .then(res => {
    //     const s = res.data.settings;
    //     setCamera(s.camera_enabled);
    //     setMic(s.mic_enabled);
    //     setLocation(s.location_enabled);
    //     setNotifications(s.notifications_enabled);
    //     setProfile({
    //       name: res.data.name || 'Unknown User',
    //       status: res.data.status || 'Unverified',
    //     });
    //   })
    //   .finally(() => setLoading(false));
  }, []);

  // Update settings in backend
  const updateSettings = async (newSettings: any) => {
    // setLoading(true);
    // await axios.put("/api/v1/users/me/settings", {
    //   camera_enabled: newSettings.camera,
    //   mic_enabled: newSettings.mic,
    //   location_enabled: newSettings.location,
    //   notifications_enabled: newSettings.notifications
    // });
    // setLoading(false);
    console.log("Settings updated", newSettings);
  };

  // Device permission logic (Expo hooks)
  const [cameraPerm, requestCameraPerm] = useCameraPermissions();
  const [locationPerm, requestLocationPerm] = useLocationPermissions();

  const requestCameraPermission = async () => {
    const perm = await requestCameraPerm();
    setCamera(perm?.status === "granted");
    updateSettings({ camera: perm?.status === "granted", mic, location, notifications });
  };
  // Microphone permission: Expo AV
  const requestMicPermission = async () => {
    let granted = false;
    if (Platform.OS === "web" && navigator?.mediaDevices?.getUserMedia) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        granted = true;
      } catch (e) {
        granted = false;
      }
    } else {
      const { status } = await Audio.requestPermissionsAsync();
      granted = status === "granted";
    }
    setMic(granted);
    updateSettings({ camera, mic: granted, location, notifications });
  };
  const requestLocationPermission = async () => {
    const perm = await requestLocationPerm();
    setLocation(perm?.status === "granted");
    updateSettings({ camera, mic, location: perm?.status === "granted", notifications });
  };

  return (
    <View style={globalStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.maxWidthContainer}>
          <ProfileCard name={profile.name} status={profile.status} />

          <View style={{ marginBottom: 32 }}>
            <PermissionToggle label="Camera" icon="CameraIcon" enabled={camera} onToggle={requestCameraPermission} />
            <PermissionToggle label="Microphone" icon="MicrophoneIcon" enabled={mic} onToggle={requestMicPermission} />
            <PermissionToggle label="Location" icon="MapPinIcon" enabled={location} onToggle={requestLocationPermission} />
          </View>

          <NotificationPreferences enabled={notifications} onToggle={() => {
            setNotifications(n => !n);
            updateSettings({ camera, mic, location, notifications: !notifications });
          }} />

          <PolicyLinks />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    paddingBottom: 32,
  },
  maxWidthContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  profileCard: {
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toggleSwitch: {
    width: 48,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
