import { SafeAreaView, ScrollView } from 'react-native';

type Props = { children: React.ReactNode; scroll?: boolean };

const Screen = ({ scroll, children }: Props) => {
  return (
    <SafeAreaView className="flex flex-1">
      {scroll ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
};

export default Screen;
