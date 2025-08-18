import { LocationObject } from 'expo-location';

export const isPrecise = (location: LocationObject | null) => {
  if (!location) return false;
  if ((location.coords.accuracy as number) < 99) {
    return true;
  }
  return false;
};
