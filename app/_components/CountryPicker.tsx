import { View } from 'react-native';
import Screen from '~/components/Screen';
import { router, Stack } from 'expo-router';
import { CText } from '~/components/CText';
import { Button } from '~/components/Button';
import { openSettings } from '~/services/utils/common';

export default function Location() {
  return (
    <>
      <Stack.Screen options={{ title: 'Choose your location' }} />
      <Screen>
        <View className="mx-12 flex-1 items-center justify-center gap-6 ">
          <Button title="Open Settings" onPress={() => openSettings()} />
          <CText variant="caption" className="text-center">
            Please allow location for a hassle-free and smooth experience
          </CText>
          <CText className="text-center">Choose your country here!</CText>
          <Button
            title="Saudi Arabia"
            onPress={() => router.replace({ pathname: '/home', params: { country: 'SA' } })}
          />
        </View>
      </Screen>
    </>
  );
}
