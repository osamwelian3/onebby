import * as React from "react";
import { Dimensions, Text, View, Image, ViewProps, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./ui/IconSymbol";
import ProductItem from "./ProductItem";
import { Product } from "@/store/product/product";
import { FlashList } from "@shopify/flash-list";
 
const width = Dimensions.get("window").width;

export type ProductsCarouselProps = ViewProps & {
    products?: Product[]
}
 
function ProductsCarousel({products}: ProductsCarouselProps) {
  console.log('ProductsCarousel')
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const data = React.useMemo(() => products, [products])
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  const renderItem = React.useCallback(({item}: {item: Product}) => <ProductItem key={item.id.toString()} style={{width: width/3, height: width/2.2}} item={item} />, [])
 
  return (
    <View style={{ flex: 1, marginRight: 5 }}>
        <FlashList 
          data={data}
          estimatedItemSize={1000}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          />
    </View>
  );
}

export default React.memo(ProductsCarousel)