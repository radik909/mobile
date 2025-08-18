import { Linking, Platform } from 'react-native';

export const openSettings = () => {
  if (Platform.OS === 'ios') Linking.openURL('app-settings:');
  else Linking.openSettings();
};
