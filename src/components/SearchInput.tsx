import { memo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface SearchInputProps {
  value: string;
  onChangeText: (value: string) => void;
}

export const SearchInput = memo(({ value, onChangeText }: SearchInputProps) => (
  <View style={styles.container}>
    <Icon name="search" size={18} color={colors.textSecondary} />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholder="Buscar por nombre"
      placeholderTextColor={colors.textSecondary}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="search"
    />
  </View>
));

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: spacing.lg,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
  },
  input: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 15,
    marginLeft: spacing.sm,
    paddingVertical: spacing.md,
  },
});
