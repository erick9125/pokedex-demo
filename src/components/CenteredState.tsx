import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface CenteredStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  isLoading?: boolean;
}

export const CenteredState = ({
  title,
  description,
  actionLabel,
  onAction,
  isLoading = false,
}: CenteredStateProps) => (
  <View style={styles.container}>
    {isLoading ? <ActivityIndicator size="large" color={colors.primary} /> : null}
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
    {actionLabel && onAction ? (
      <Pressable style={styles.button} onPress={onAction}>
        <Text style={styles.buttonLabel}>{actionLabel}</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: spacing.md,
    textAlign: 'center',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  buttonLabel: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '700',
  },
});
