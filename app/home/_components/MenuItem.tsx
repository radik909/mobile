import { TouchableOpacity, Dimensions } from 'react-native';
import { MenuItemType } from '~/services/api/menu';
import { Image } from 'expo-image';
import { CText } from '~/components/CText';

const colWidth = Dimensions.get('window').width / 3;

type Props = {
  item: MenuItemType;
};

export default function MenuItem({ item }: Props) {
  return (
    <TouchableOpacity style={{ width: colWidth * item.width, height: colWidth * item.height }}>
      <Image source={{ uri: item.imageUrl }} style={{ flex: 1, margin: 2 }} contentFit="cover" />
      <CText style={{ position: 'absolute', bottom: 0 }} variant="caption">
        {item.product.name}
      </CText>
    </TouchableOpacity>
  );
}
