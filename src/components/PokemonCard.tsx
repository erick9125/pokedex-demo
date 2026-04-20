import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { PokemonCardItem } from '../types/pokemon';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { formatPokemonId, formatPokemonName } from '../utils/formatters';

interface PokemonCardProps {
  pokemon: PokemonCardItem;
  onPress: (pokemon: PokemonCardItem) => void;
}

export const PokemonCard = memo(({ pokemon, onPress }: PokemonCardProps) => (
  <Pressable onPress={() => onPress(pokemon)} style={styles.card}>
    <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
    <Image source={{ uri: pokemon.imageUrl }} style={styles.image} resizeMode="contain" />
    <Text style={styles.name}>{formatPokemonName(pokemon.name)}</Text>
    <View style={styles.typeChip}>
      <Text style={styles.typeText}>{pokemon.primaryType.toUpperCase()}</Text>
    </View>
  </Pressable>
));

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.xl,
    elevation: 2,
    flex: 1,
    margin: spacing.sm,
    padding: spacing.lg,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  id: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: spacing.sm,
    width: '100%',
  },
  image: {
    height: 92,
    width: 92,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  typeChip: {
    backgroundColor: colors.typeChip,
    borderRadius: 999,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  typeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});
