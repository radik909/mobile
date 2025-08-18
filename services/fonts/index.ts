import { useFonts } from 'expo-font';

export function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    HelveticaNeue: require('./HelveticaNeue-Medium.otf'),
    HelveticaNeueMedium: require('./HelveticaNeue.otf'),
    Digit: require('./digital-7.otf'),
    SaudiRiyal: require('./SaudiRiyalFont.ttf'),
  });

  return fontsLoaded;
}
