import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { COLORS, globalStyles } from "../../theme";

const ICONS = {
  PlayIcon: '▶️',
  PhotoIcon: '🖼️',
  MapPinIcon: '📍',
};

function Header() {
  return (
    <View style={globalStyles.header}>
      <Text style={globalStyles.headerTitle}>Review Submission</Text>
    </View>
  );
}

function EvidencePreviewList({ items }: { items: { type: string; thumb: string; }[] }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>Evidence</Text>
      <View style={{ flexDirection: 'row', gap: 16, paddingBottom: 8 }}>
        {items.map((item, idx) => (
          <View key={idx} style={styles.evidenceItem}>
            <Text style={{ fontSize: 32, color: COLORS.primaryHighlight }}>{item.type === 'video' ? ICONS.PlayIcon : ICONS.PhotoIcon}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function IncidentDetailsSummary({ details }: { details: { title: string; desc: string; type: string; } }) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Incident Details</Text>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>{details.title}</Text>
      <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 4 }}>Type: {details.type}</Text>
      <Text style={{ fontSize: 14, color: '#d1d5db' }}>{details.desc}</Text>
    </View>
  );
}

function LocationSummary({ location }: { location: { gps: string; address: string; } }) {
  return (
    <View style={[styles.card, { flexDirection: 'row', alignItems: 'center', gap: 12 }]}>
      <Text style={{ fontSize: 24, color: COLORS.primaryHighlight }}>{ICONS.MapPinIcon}</Text>
      <View>
        <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>GPS: {location.gps}</Text>
        <Text style={{ fontSize: 14, color: '#fff' }}>{location.address}</Text>
      </View>
    </View>
  );
}

function LegalDisclaimer() {
  return (
    <View style={styles.card}>
      <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>
        By submitting, you confirm all evidence is accurate and you consent to share this information with law enforcement. False reporting is a criminal offense.
      </Text>
    </View>
  );
}

function SubmitButton() {
  return (
    <View style={styles.submitContainer}>
      <Pressable style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit to Authorities</Text>
      </Pressable>
    </View>
  );
}

export default function SubmissionReviewScreen() {
  const evidence = [
    { type: "video", thumb: "https://placehold.co/96x96?text=VID" },
    { type: "image", thumb: "https://placehold.co/96x96?text=IMG" },
  ];
  const details = {
    title: "Assault at 5th & Main",
    desc: "Physical altercation witnessed outside the store. Video and photo evidence attached.",
    type: "Assault"
  };
  const location = {
    gps: "40.7128° N, 74.0060° W",
    address: "5th Ave & Main St, New York, NY"
  };

  return (
    <View style={globalStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.maxWidthContainer}>
          <EvidencePreviewList items={evidence} />
          <IncidentDetailsSummary details={details} />
          <LocationSummary location={location} />
          <LegalDisclaimer />
          <SubmitButton />
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
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.primaryHighlight,
    marginBottom: 8,
  },
  evidenceItem: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
  submitContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButton: {
    width: '100%',
    maxWidth: 400,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
