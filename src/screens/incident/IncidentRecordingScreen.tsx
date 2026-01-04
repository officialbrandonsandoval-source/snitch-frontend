import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS, globalStyles } from "../../theme";

function TopNav() {
  return (
    <View style={globalStyles.header}>
      <Text style={{ fontSize: 24, color: '#fff' }}>←</Text>
      <Text style={globalStyles.headerTitle}>Record Incident</Text>
      <Text style={{ fontSize: 24, color: '#fff' }}>⚙️</Text>
    </View>
  );
}

function CameraPreview() {
  return (
    <View style={styles.cameraPreview}>
      <Text style={{ fontSize: 48, color: '#71717a' }}>📷</Text>
      <Text style={{ marginLeft: 16, color: COLORS.textSecondary }}>[ Camera Preview ]</Text>
    </View>
  );
}

interface RecordingControlsProps {
  isRecording: boolean;
  onRecord: () => void;
  onSwitchCamera: () => void;
  onFlashlight: () => void;
}
function RecordingControls({ isRecording, onRecord, onSwitchCamera, onFlashlight }: RecordingControlsProps) {
  return (
    <View style={styles.controlsContainer}>
      <Pressable onPress={onRecord}>
        <Text style={[styles.recordButton, { backgroundColor: isRecording ? COLORS.danger : COLORS.primary }]}>●</Text>
      </Pressable>
      <Pressable onPress={onSwitchCamera}>
        <Text style={styles.controlButton}>📷</Text>
      </Pressable>
      <Pressable onPress={onFlashlight}>
        <Text style={styles.controlButton}>⚡</Text>
      </Pressable>
    </View>
  );
}

function StatusIndicators() {
  return (
    <View style={styles.statusContainer}>
      <View style={styles.statusItem}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>GPS Locked</Text>
      </View>
      <Text style={styles.statusText}>{new Date().toLocaleTimeString()}</Text>
      <Text style={styles.statusText}>Storage: 2.1 GB</Text>
    </View>
  );
}

function SafetyDisclaimer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.disclaimerText}>
        All recordings are encrypted and securely stored. Do not record in unsafe conditions.
      </Text>
    </View>
  );
}

export default function IncidentRecordingScreen() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <View style={globalStyles.container}>
      <TopNav />
      <View style={styles.content}>
        <View style={styles.maxWidthContainer}>
          <CameraPreview />
          <RecordingControls
            isRecording={isRecording}
            onRecord={() => setIsRecording((r) => !r)}
            onSwitchCamera={() => {}}
            onFlashlight={() => {}}
          />
          <StatusIndicators />
        </View>
      </View>
      <SafetyDisclaimer />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  maxWidthContainer: {
    width: '100%',
    maxWidth: 400,
  },
  cameraPreview: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 24,
  },
  recordButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 32,
    overflow: 'hidden',
    lineHeight: 64,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 24,
    overflow: 'hidden',
    lineHeight: 48,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#101014',
  },
  disclaimerText: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
