import { Redirect } from 'expo-router';
import CountryPicker from '~/app/_components/CountryPicker';
import { useLocationWatcher } from '~/services/location';

export default function Index() {
  const location = useLocationWatcher();
  if (!location) return <CountryPicker />;

  return <Redirect href="/home" />;
}
