export const formatPokemonName = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const formatPokemonId = (id: number) => `#${String(id).padStart(3, '0')}`;

export const formatPokemonMetric = (value: number, unit: string) => {
  const normalizedValue = value / 10;
  return `${normalizedValue.toFixed(1)} ${unit}`;
};

export const extractPokemonIdFromUrl = (url: string) => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
};
