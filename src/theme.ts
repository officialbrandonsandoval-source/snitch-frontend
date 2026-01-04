import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#0f0f0f',
  surface: '#18181b',
  surfaceHighlight: '#27272a',
  primary: '#3b82f6',
  primaryHighlight: '#60a5fa',
  text: '#ffffff',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  danger: '#ef4444',
  warning: '#f59e42',
  success: '#22c55e',
  border: '#27272a',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#101014',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryHighlight,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 16,
  },
  text: {
    color: COLORS.text,
  },
  textSecondary: {
    color: COLORS.textSecondary,
  },
});
