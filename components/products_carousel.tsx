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
 
const width = Dimensions.get("window").width;

export type ProductsCarouselProps = ViewProps & {
    products?: Product[]
}
 
function ProductsCarousel({products}: ProductsCarouselProps) {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  
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
 
  return (
    <View style={{ flex: 1 }} 
      id="carousel-component"
			dataSet={{ kind: "custom-animations", name: "multiple" }}>
      <Carousel
        ref={ref}
        width={width / 2}
        loop
        data={products}
        onProgressChange={progress}
        containerStyle={{
          flex: 1,
          width: width,
          minHeight: width/1.5
        }}
        style={{
          width: width,
          flexDirection: 'column',
          flex: 1
        }}
        renderItem={({ item, index }) => (
          <ProductItem item={item} />
        )}
      />
 
      {/* <Pagination.Basic
        progress={progress}
        data={products}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      /> */}
    </View>
  );
}

export default ProductsCarousel