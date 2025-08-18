import { atom } from 'jotai';
import { LocationObject } from 'expo-location';

export const locationAtom = atom<LocationObject | null | undefined>(undefined);
