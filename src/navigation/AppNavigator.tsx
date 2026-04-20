import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokedexScreen } from '../screens/PokedexScreen';
import { PokemonDetailScreen } from '../screens/PokemonDetailScreen';
import { RootStackParamList } from './types';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    border: colors.border,
    text: colors.textPrimary,
    primary: colors.primary,
  },
};

export const AppNavigator = () => (
  <NavigationContainer theme={navigationTheme}>
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: colors.textPrimary,
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options={{ title: 'Pokedex QA Demo' }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={{ title: 'Detalle Pokemon' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
