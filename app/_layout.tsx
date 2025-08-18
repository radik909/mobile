import { ApiProvider, apiClient } from '~/services/api';
import '../global.css';
import { Stack, SplashScreen } from 'expo-router';
import { useLoadFonts } from '~/services/fonts';
import { useEffect } from 'react';
import { useI18n } from '~/services/i18n';

export default function Layout() {
  useI18n(); // Keep it first
  const fontsLoaded = useLoadFonts();
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // keep splash screen until ready
  }

  return (
    <ApiProvider client={apiClient}>
      <Stack />
    </ApiProvider>
  );
}
