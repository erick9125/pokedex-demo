import { useCallback, useEffect, useMemo, useState } from 'react';
import { PokemonCardItem } from '../types/pokemon';
import { getPokemonPage } from '../services/pokemonService';

const PAGE_SIZE = 20;

export const usePokemonList = () => {
  const [pokemonItems, setPokemonItems] = useState<PokemonCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const hasNextPage = useMemo(
    () => pokemonItems.length < totalCount || totalCount === 0,
    [pokemonItems.length, totalCount],
  );

  const loadPage = useCallback(
    async (nextOffset: number, mode: 'initial' | 'refresh' | 'append') => {
      if (mode === 'initial') {
        setIsLoading(true);
      }

      if (mode === 'refresh') {
        setIsRefreshing(true);
      }

      if (mode === 'append') {
        setIsLoadingMore(true);
      }

      try {
        setErrorMessage(null);
        const response = await getPokemonPage(PAGE_SIZE, nextOffset);

        setTotalCount(response.count);
        setOffset(nextOffset);

        if (mode === 'append') {
          setPokemonItems(previous => [...previous, ...response.items]);
        } else {
          setPokemonItems(response.items);
        }
      } catch {
        setErrorMessage('No se pudieron cargar los Pokemon. Intenta nuevamente.');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
        setIsLoadingMore(false);
      }
    },
    [],
  );

  const refresh = useCallback(() => {
    loadPage(0, 'refresh');
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (isLoading || isRefreshing || isLoadingMore || !hasNextPage) {
      return;
    }

    loadPage(offset + PAGE_SIZE, 'append');
  }, [hasNextPage, isLoading, isLoadingMore, isRefreshing, loadPage, offset]);

  const retry = useCallback(() => {
    loadPage(0, 'initial');
  }, [loadPage]);

  useEffect(() => {
    loadPage(0, 'initial');
  }, [loadPage]);

  return {
    pokemonItems,
    isLoading,
    isRefreshing,
    isLoadingMore,
    errorMessage,
    hasNextPage,
    refresh,
    loadMore,
    retry,
  };
};
