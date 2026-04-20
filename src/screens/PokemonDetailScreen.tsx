import { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CenteredState } from '../components/CenteredState';
import { RootStackParamList } from '../navigation/types';
import { getPokemonDetailByName } from '../services/pokemonService';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { PokemonDetail } from '../types/pokemon';
import {
  formatPokemonId,
  formatPokemonMetric,
  formatPokemonName,
} from '../utils/formatters';

type PokemonDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PokemonDetail'
>;

export const PokemonDetailScreen = ({ route }: PokemonDetailScreenProps) => {
  const { pokemonName } = route.params;
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadPokemonDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const detail = await getPokemonDetailByName(pokemonName);
      setPokemonDetail(detail);
    } catch {
      setErrorMessage('No se pudo obtener el detalle del Pokemon.');
    } finally {
      setIsLoading(false);
    }
  }, [pokemonName]);

  useEffect(() => {
    loadPokemonDetail();
  }, [loadPokemonDetail]);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <CenteredState
          title="Cargando detalle"
          description="Obteniendo informacion desde PokeAPI."
          isLoading
        />
      </View>
    );
  }

  if (errorMessage || !pokemonDetail) {
    return (
      <View style={styles.screen}>
        <CenteredState
          title="No disponible"
          description={errorMessage ?? 'No encontramos informacion del Pokemon.'}
          actionLabel="Reintentar"
          onAction={loadPokemonDetail}
        />
      </View>
    );
  }

  const imageUrl =
    pokemonDetail.sprites.other?.['official-artwork']?.front_default ??
    pokemonDetail.sprites.front_default;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.heroId}>{formatPokemonId(pokemonDetail.id)}</Text>
        <Image source={{ uri: imageUrl ?? '' }} style={styles.heroImage} resizeMode="contain" />
        <Text style={styles.heroName}>{formatPokemonName(pokemonDetail.name)}</Text>
        <View style={styles.typeContainer}>
          {pokemonDetail.types.map(item => (
            <View key={item.type.name} style={styles.typeChip}>
              <Text style={styles.typeText}>{item.type.name.toUpperCase()}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Datos generales</Text>
        <Text style={styles.infoRow}>
          Altura: <Text style={styles.infoValue}>{formatPokemonMetric(pokemonDetail.height, 'm')}</Text>
        </Text>
        <Text style={styles.infoRow}>
          Peso: <Text style={styles.infoValue}>{formatPokemonMetric(pokemonDetail.weight, 'kg')}</Text>
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        {pokemonDetail.abilities.map(ability => (
          <Text key={ability.ability.name} style={styles.infoRow}>
            - {formatPokemonName(ability.ability.name)}
          </Text>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Stats principales</Text>
        {pokemonDetail.stats.slice(0, 6).map(stat => (
          <View key={stat.stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{formatPokemonName(stat.stat.name)}</Text>
            <Text style={styles.statValue}>{stat.base_stat}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    rowGap: spacing.lg,
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.xl,
    padding: spacing.xl,
  },
  heroId: {
    alignSelf: 'flex-start',
    color: colors.textSecondary,
    fontWeight: '700',
  },
  heroImage: {
    height: 180,
    width: 180,
  },
  heroName: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
  },
  typeContainer: {
    columnGap: spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing.md,
    rowGap: spacing.sm,
  },
  typeChip: {
    backgroundColor: colors.typeChip,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  typeText: {
    color: colors.primary,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: spacing.xl,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  infoRow: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  infoValue: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  statName: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
});
