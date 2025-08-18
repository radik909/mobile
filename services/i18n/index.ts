import { useLocales, useCalendars } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './en';
import ar from './ar';

type I18nAddon = { timeZone: string; isRTL: boolean; countryCode: string };

const i18n = new I18n({
  en,
  ar,
}) as I18n & I18nAddon;

i18n.enableFallback = true;

// Automatically refreshes i18n object
export function useI18n() {
  const calendar = useCalendars()[0];
  const locale = useLocales()[0];

  i18n.locale = locale.languageCode as string;
  i18n.timeZone = calendar.timeZone as string;
  i18n.isRTL = locale.textDirection === 'ltr' ? false : true;
  i18n.countryCode = locale.regionCode as string;
}

export default i18n;
