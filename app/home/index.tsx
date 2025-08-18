import { Stack, useLocalSearchParams } from 'expo-router';
import Screen from '~/components/Screen';
import { useGetMenuItems } from '~/services/api/menu';
import { FlashList } from '@shopify/flash-list';
import ErrorView from '~/components/ErrorView';
import LoadingView from '~/components/LoadingView';
import MenuItem from '~/app/home/_components/MenuItem';
import { sortToFitLayout } from '~/services/utils/layout';
import { useAtomValue } from 'jotai';
import { locationAtom } from '~/services/location/state';

type HomeParamsType = {
  country?: string;
};

export default function Home() {
  const { country } = useLocalSearchParams<HomeParamsType>();
  const location = useAtomValue(locationAtom);
  // This will be fetch initial data call
  const { data, isLoading, error, refetch } = useGetMenuItems(
    location ? { lat: location.coords.latitude, lng: location.coords.longitude } : { country }
  );

  if (error) {
    return <ErrorView error={error} retry={refetch} />;
  }

  if (isLoading) {
    return <LoadingView />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Screen>
        <FlashList
          showsVerticalScrollIndicator={false}
          data={sortToFitLayout(data)}
          masonry
          numColumns={3}
          overrideItemLayout={(layout, item) => {
            layout.span = item.width;
          }}
          renderItem={({ item }) => <MenuItem item={item} />}
          keyExtractor={(item, index) => `${item.product.id}-${item.width}-${item.height}-${index}`}
        />
      </Screen>
    </>
  );
}

// On top of this screen will appear a
// Popup to confirm or change the default selected channel for which the menu is loaded (sent from API)
// If delivery, default/matched address is prefilled. If pickup, default branch is prefilled.
// Will allow to dismiss only if a default selected address or branch is available
// If location is null/undefined, delivery option will be disabled!

// ------ DELIVERY ------
//   return (
//   <Redirect
//     href={{
//       pathname: "/home/delivery",
//       params: { lat: location.lat, lng: location.lng },
//     }}
//   />
// );
// ------ PICKUP ------ (For menu per branch)
//   return (
//   <Redirect
//     href={{
//       pathname: "/home/branch",
//       params: { mode: "pickup", branchId: 542 },
//     }}
//   />
// );
// ------ INSTORE ------
//   return (
//   <Redirect
//     href={{
//       pathname: "/home/branch",
//       params: { mode: "instore", branchId: 542 },
//     }}
//   />
// );
