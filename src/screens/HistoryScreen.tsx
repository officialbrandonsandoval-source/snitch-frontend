import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { globalStyles, COLORS } from '../theme';

const MOCK_HISTORY = [
  { id: '1', label: 'Noise complaint', timestamp: '2024-04-01T12:00:00Z' },
  { id: '2', label: 'Suspicious package', timestamp: '2024-04-02T09:41:00Z' },
  { id: '3', label: 'Jaywalking ring', timestamp: '2024-04-04T22:13:00Z' }
];

export default function HistoryScreen() {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={MOCK_HISTORY}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.surface
  },
  label: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600'
  },
  timestamp: {
    color: COLORS.textSecondary,
    marginTop: 4
  },
  separator: {
    height: 12
  }
});
