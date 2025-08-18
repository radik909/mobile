/* eslint-disable no-restricted-imports */
import { Text, View, ViewStyle } from 'react-native';
import { Button } from './Button';
import { Stack } from 'expo-router';
import Screen from './Screen';

type Props = {
  error: Error | null;
  retry?: () => void;
  containerStyles?: ViewStyle;
};

export default function ErrorView({ error, retry, containerStyles }: Props) {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Somethings went wrong.' }} />
      <Screen>
        <View style={containerStyles}>
          <View className="mx-12 items-center">
            <Text className="text-center text-lg leading-6 text-red-900">An Error Occurred</Text>
            <Text className="text-center text-lg leading-6 text-red-500">{String(error)}</Text>
            {retry ? <Button title="Retry" onPress={() => retry()} /> : null}
          </View>
        </View>
      </Screen>
    </>
  );
}
