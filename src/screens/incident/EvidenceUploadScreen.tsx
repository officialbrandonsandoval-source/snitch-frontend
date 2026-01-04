import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { COLORS, globalStyles } from "../../theme";

const TAGS = ["Speeding", "Assault", "Theft", "Vandalism", "Other"];

function Header() {
  return (
    <View style={globalStyles.header}>
      <Text style={globalStyles.headerTitle}>Add Evidence</Text>
    </View>
  );
}

interface EvidenceItem {
  id: string;
  type: string;
  thumb: string;
}
interface EvidenceListProps {
  items: EvidenceItem[];
  onDelete: (id: string) => void;
}
function EvidenceList({ items, onDelete }: EvidenceListProps) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>Evidence Items</Text>
      <View style={{ flexDirection: 'row', gap: 16, paddingBottom: 8 }}>
        {items.map((item) => (
          <View key={item.id} style={styles.evidenceItem}>
            <Text style={{ fontSize: 32, color: COLORS.primaryHighlight }}>{item.type === 'Video' ? '🎥' : '🖼️'}</Text>
            <Pressable style={styles.deleteButton} onPress={() => onDelete(item.id)}>
              <Text style={{ color: '#fff', fontSize: 12 }}>🗑️</Text>
            </Pressable>
          </View>
        ))}
        <View style={styles.addEvidenceButton}>
          <Text style={{ color: COLORS.primaryHighlight, fontSize: 24 }}>＋</Text>
        </View>
      </View>
    </View>
  );
}

function IncidentDetailsForm() {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.label}>Type</Text>
      <Text style={styles.inputDisplay}>Speeding</Text>
      <Text style={styles.label}>Location</Text>
      <Text style={styles.inputDisplay}>Enter location</Text>
      <Text style={styles.label}>Description</Text>
      <Text style={[styles.inputDisplay, { minHeight: 60 }]}>Describe the incident...</Text>
    </View>
  );
}

interface TagsSectionProps {
  selected: string[];
  onToggle: (tag: string) => void;
}
function TagsSection({ selected, onToggle }: TagsSectionProps) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>Tags</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {TAGS.map((tag) => (
          <Pressable
            key={tag}
            style={[
              styles.tag,
              { backgroundColor: selected.includes(tag) ? COLORS.primary : COLORS.surface }
            ]}
            onPress={() => onToggle(tag)}
          >
            <Text style={{ color: selected.includes(tag) ? '#fff' : COLORS.textSecondary }}>
              {tag}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function UploadProgress() {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>Upload Progress</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
      </View>
      <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>Uploading evidence... 60%</Text>
    </View>
  );
}

function SubmitButton() {
  return (
    <View style={styles.footer}>
      <View style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Evidence</Text>
      </View>
    </View>
  );
}

export default function EvidenceUploadScreen() {
  const [evidence, setEvidence] = useState<EvidenceItem[]>([
    { id: "1", type: "Video", thumb: "https://placehold.co/96x96?text=VID" },
    { id: "2", type: "Photo", thumb: "https://placehold.co/96x96?text=IMG" },
  ]);
  const [tags, setTags] = useState(["Speeding"]);

  const handleDelete = (id: string) => setEvidence(evidence.filter((e) => e.id !== id));
  const handleToggleTag = (tag: string) =>
    setTags((t) =>
      t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]
    );

  return (
    <View style={globalStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.maxWidthContainer}>
          <EvidenceList items={evidence} onDelete={handleDelete} />
          <IncidentDetailsForm />
          <TagsSection selected={tags} onToggle={handleToggleTag} />
          <UploadProgress />
        </View>
      </ScrollView>
      <SubmitButton />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    paddingBottom: 100,
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
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  addEvidenceButton: {
    width: 96,
    height: 96,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  inputDisplay: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    width: '60%',
    height: 8,
    backgroundColor: COLORS.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#101014',
    borderTopWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    alignItems: 'center',
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
