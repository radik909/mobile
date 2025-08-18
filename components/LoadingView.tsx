import { View, ActivityIndicator } from 'react-native';
import Screen from './Screen';
import { Stack } from 'expo-router';

export default function LoadingView() {
  return (
    <>
      <Stack.Screen options={{ title: 'Loading...' }} />
      <Screen>
        <View className="m-12 items-center">
          <ActivityIndicator size="large" className="text-black" />
        </View>
      </Screen>
    </>
  );
}
