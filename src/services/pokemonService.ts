import { httpClient } from '../api/httpClient';
import { PokemonCardItem, PokemonDetail, PokemonListResponse } from '../types/pokemon';
import { extractPokemonIdFromUrl } from '../utils/formatters';

const getImageUrl = (detail: PokemonDetail) =>
  detail.sprites.other?.['official-artwork']?.front_default ??
  detail.sprites.front_default ??
  '';

const mapPokemonCardItem = (detail: PokemonDetail): PokemonCardItem => ({
  id: detail.id,
  name: detail.name,
  imageUrl: getImageUrl(detail),
  primaryType: detail.types[0]?.type.name ?? 'unknown',
});

export const getPokemonDetailByName = async (name: string) => {
  const response = await httpClient.get<PokemonDetail>(`/pokemon/${name}`);
  return response.data;
};

export const getPokemonDetailById = async (id: number) => {
  const response = await httpClient.get<PokemonDetail>(`/pokemon/${id}`);
  return response.data;
};

export const getPokemonPage = async (limit: number, offset: number) => {
  const listResponse = await httpClient.get<PokemonListResponse>('/pokemon', {
    params: { limit, offset },
  });

  const detailRequests = listResponse.data.results.map(resource => {
    const pokemonId = extractPokemonIdFromUrl(resource.url);
    return pokemonId > 0
      ? getPokemonDetailById(pokemonId)
      : getPokemonDetailByName(resource.name);
  });

  const details = await Promise.all(detailRequests);
  const items = details.map(mapPokemonCardItem);

  return {
    items,
    count: listResponse.data.count,
    hasNextPage: Boolean(listResponse.data.next),
  };
};
