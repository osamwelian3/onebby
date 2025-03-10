import { useRouter } from "expo-router";
import * as React from "react";
import { Dimensions, Text, View, Image, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
 
const data = [
    "https://www.onebby.it/img/cms/banner%20home%20dixe%20(1920%20x%20500%20px)%20(600%20x%20300%20px)%20(600%20x%20400%20px)(1).webp",
    "https://www.onebby.it/img/cms/Consegna%20Gratuita.webp",
];
const width = Dimensions.get("window").width;
 
function CarouselLayout() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const router = useRouter();
  
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
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width}
        height={width / 2}
        data={data}
        autoPlay={true}
        autoPlayInterval={4000}
        onProgressChange={progress}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity activeOpacity={1} onPress={() => null}>
              <Image source={{uri: item}} resizeMode='cover' style={{width: width, height: width/2}} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default React.memo(CarouselLayout)