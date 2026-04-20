import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CenteredState } from '../components/CenteredState';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { useDebounce } from '../hooks/useDebounce';
import { usePokemonList } from '../hooks/usePokemonList';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { PokemonCardItem } from '../types/pokemon';

type PokedexScreenProps = NativeStackScreenProps<RootStackParamList, 'Pokedex'>;

export const PokedexScreen = ({ navigation }: PokedexScreenProps) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText.trim().toLowerCase(), 250);

  const {
    pokemonItems,
    isLoading,
    isRefreshing,
    isLoadingMore,
    errorMessage,
    loadMore,
    refresh,
    retry,
  } = usePokemonList();

  const filteredItems = useMemo(() => {
    if (!debouncedSearchText) {
      return pokemonItems;
    }

    return pokemonItems.filter(item => item.name.includes(debouncedSearchText));
  }, [debouncedSearchText, pokemonItems]);

  const handleOpenDetail = (pokemon: PokemonCardItem) => {
    navigation.navigate('PokemonDetail', {
      pokemonName: pokemon.name,
    });
  };

  const renderItem: ListRenderItem<PokemonCardItem> = ({ item }) => (
    <PokemonCard pokemon={item} onPress={handleOpenDetail} />
  );

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <CenteredState
          title="Cargando Pokedex"
          description="Consultando datos reales desde PokeAPI."
          isLoading
        />
      </View>
    );
  }

  if (errorMessage && pokemonItems.length === 0) {
    return (
      <View style={styles.screen}>
        <CenteredState
          title="Error de conexion"
          description={errorMessage}
          actionLabel="Reintentar"
          onAction={retry}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Explora Pokemon reales</Text>
        <Text style={styles.subtitle}>
          Demo enfocada en QA de usabilidad con builds Android compartibles.
        </Text>
        <SearchInput value={searchText} onChangeText={setSearchText} />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.column}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        refreshing={isRefreshing}
        onRefresh={refresh}
        ListEmptyComponent={
          <CenteredState
            title="Sin resultados"
            description="No encontramos Pokemon para tu busqueda."
          />
        }
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator style={styles.footerLoader} color={colors.primary} />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.sm,
  },
  column: {
    justifyContent: 'space-between',
  },
  footerLoader: {
    marginTop: spacing.md,
  },
});
