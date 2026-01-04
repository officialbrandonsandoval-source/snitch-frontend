import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { COLORS, globalStyles } from "../../theme";

const TIERS = ["Bronze", "Silver", "Gold", "Elite"];
const CURRENT_TIER = 2; // Gold
const PROGRESS = 75; // percent to next tier

const ICONS = {
  CheckCircleIcon: '✅',
  ArrowRightIcon: '➡️',
  ClockIcon: '⏰',
  BanknotesIcon: '💵',
};

function TopNav() {
  return (
    <View style={globalStyles.header}>
      <Text style={globalStyles.headerTitle}>Rewards</Text>
    </View>
  );
}

function EarningsCard() {
  return (
    <View style={styles.earningsCard}>
      <View>
        <Text style={styles.label}>Lifetime Earnings</Text>
        <Text style={[styles.amount, { color: '#4ade80' }]}>$2,350.00</Text>
      </View>
      <View>
        <Text style={styles.label}>Pending</Text>
        <Text style={[styles.amount, { color: '#facc15', fontSize: 20 }]}>$120.00</Text>
      </View>
      <View>
        <Text style={styles.label}>Paid</Text>
        <Text style={[styles.amount, { color: '#60a5fa', fontSize: 20 }]}>$2,230.00</Text>
      </View>
    </View>
  );
}

function TierProgressBar() {
  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        {TIERS.map((tier, idx) => (
          <View key={tier} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: idx <= CURRENT_TIER ? COLORS.primaryHighlight : COLORS.textSecondary }}>{tier}</Text>
            <View style={{ width: 12, height: 12, borderRadius: 6, marginTop: 4, backgroundColor: idx <= CURRENT_TIER ? COLORS.primaryHighlight : COLORS.border }} />
          </View>
        ))}
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${PROGRESS}%` }]} />
      </View>
      <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 8, textAlign: 'right' }}>{PROGRESS}% to Elite</Text>
    </View>
  );
}

function RewardActions() {
  return (
    <View style={{ marginBottom: 32, flexDirection: 'row', gap: 16 }}>
      <Pressable style={styles.actionButtonSecondary}>
        <Text style={{ fontSize: 20, color: COLORS.primaryHighlight }}>{ICONS.ClockIcon}</Text>
        <Text style={{ color: COLORS.primaryHighlight, fontWeight: 'bold' }}>View History</Text>
      </Pressable>
      <Pressable style={styles.actionButtonPrimary}>
        <Text style={{ fontSize: 20, color: '#fff' }}>{ICONS.BanknotesIcon}</Text>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Withdraw Funds</Text>
      </Pressable>
    </View>
  );
}

const EVENTS = [
  {
    label: "Reward Paid",
    icon: 'CheckCircleIcon',
    time: "2025-11-17 10:00",
    desc: "$100 paid for incident INC-20251117-001"
  },
  {
    label: "Reward Qualified",
    icon: 'ArrowRightIcon',
    time: "2025-11-17 09:30",
    desc: "Incident INC-20251117-001 qualified for reward"
  },
  {
    label: "Reward Paid",
    icon: 'CheckCircleIcon',
    time: "2025-10-22 14:12",
    desc: "$50 paid for incident INC-20251022-003"
  },
];

function EventsList() {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={styles.sectionTitle}>Recent Reward Events</Text>
      {EVENTS.map((event, idx) => (
        <View key={idx} style={styles.eventItem}>
          <Text style={{ fontSize: 24, color: COLORS.primaryHighlight, marginTop: 4 }}>{ICONS[event.icon as keyof typeof ICONS]}</Text>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>{event.label}</Text>
              <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>{event.time}</Text>
            </View>
            <Text style={{ fontSize: 14, color: '#d1d5db', marginTop: 4 }}>{event.desc}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default function RewardDashboardScreen() {
  return (
    <View style={globalStyles.container}>
      <TopNav />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.maxWidthContainer}>
          <EarningsCard />
          <TierProgressBar />
          <RewardActions />
          <EventsList />
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
  earningsCard: {
    marginBottom: 32,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    gap: 24,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  actionButtonSecondary: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonPrimary: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.primaryHighlight,
    marginBottom: 8,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
});
