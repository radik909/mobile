import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  Accuracy,
  hasServicesEnabledAsync,
} from 'expo-location';
import { Alert } from 'react-native';
import { useAppStateForeground } from '~/services/utils/appState';
import { locationAtom } from './state';
import { openSettings } from '../utils/common';

const locationAlert = (message: string) => {
  Alert.alert('Location Permission Required', message, [
    { text: 'Not Now', style: 'cancel' },
    {
      text: 'Open Settings',
      onPress: () => openSettings(),
    },
  ]);
};

export const getLocationWithPermission = async () => {
  try {
    const servicesEnabled = await hasServicesEnabledAsync();
    if (!servicesEnabled) {
      locationAlert('Please enable Location (GPS or Location Service) in your phone settings.');
      return null;
    }

    let { granted } = await requestForegroundPermissionsAsync();

    if (!granted) {
      locationAlert('Please enable location access in Settings for a hassle-free experience');
      return null;
    }

    const loc = await getCurrentPositionAsync({
      accuracy: Accuracy.BestForNavigation,
    });

    if (
      !(
        loc.coords.accuracy === Accuracy.BestForNavigation ||
        loc.coords.accuracy === Accuracy.Highest
      )
    ) {
      locationAlert('Please enable precise location for a better experience');
    }
    return loc;
  } catch (err: any) {
    console.error(err.message);
    return null;
  }
};

export function useLocationWatcher() {
  const [location, setLocation] = useAtom(locationAtom);

  const updateLocation = async () => {
    const loc = await getLocationWithPermission();
    if (loc) setLocation(loc);
  };

  useEffect(() => {
    updateLocation();
  }, []);

  useAppStateForeground(() => {
    updateLocation();
  });

  return location;
}
