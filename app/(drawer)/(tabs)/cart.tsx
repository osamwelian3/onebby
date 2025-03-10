import { StyleSheet, Image, Platform, StatusBar, Dimensions, TouchableOpacity, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouteInfo, useRouter } from 'expo-router/build/hooks';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '@/store';
import { useCallback, useMemo } from 'react';
import { addItemCount, CartItem, priceSelector, removeItemFromCart } from '@/store/cart/cart';
import OptimizedImage from '@/components/OptimizedImage';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { Colors } from '@/constants/Colors';

const {width, height} = Dimensions.get('window')

export default function CartTab() {
  const dispatch = useAppDispatch()
  // const cartItems = useAppSelector((state) => state.cart.cartItems)
  const router = useRouter()
  console.log(useRouteInfo())
  const cartItems = useAppSelector((state) => state.cart.cartItems)
  const cartPrice = cartItems.map((it) => Number((Number(it.product.price)*it.count).toFixed(2))).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2)

  const data = useMemo(() => cartItems, [cartItems])

  const renderCartItem = useCallback(({item}: {item: CartItem}) => (
    <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20}}>
      <OptimizedImage productId={item.product.id} imageId={item.product.id_default_image} style={{width: 40, height: 40, borderRadius: 5}} />
      <ThemedView style={{width: '40%'}}>
        <ThemedText numberOfLines={2} ellipsizeMode='tail' style={{width: '100%', fontSize: 12}}>{item.product.name}</ThemedText>
        <ThemedText numberOfLines={1} adjustsFontSizeToFit={true} lightColor={Colors.light.textInputBorder} style={{fontSize: 12}}>{item.count}*{Number(item.product.price).toFixed(2)+' €'} = <ThemedText numberOfLines={1} allowFontScaling style={{fontWeight: 'bold'}}>{(Number(item.product.price)*item.count).toFixed(2)+' €'}</ThemedText></ThemedText>
      </ThemedView>
      <ThemedView style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => dispatch(addItemCount({productId: item.product.id, count: item.count-1}))} style={{width: 20, height: 20, backgroundColor: Colors.light.textInputBorder, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginRight: 2}}><Text style={{fontSize: 20, lineHeight: 20}}>-</Text></TouchableOpacity>
        <ThemedTextInput onChangeText={(text) => dispatch(addItemCount({productId: item.product.id, count: Number(text)}))} placeholder={item.count.toString()} keyboardType='number-pad' inputMode='numeric' style={{marginTop: 5, width: 50, padding: 0}} />
        <TouchableOpacity onPress={() => dispatch(addItemCount({productId: item.product.id, count: item.count+1}))} style={{width: 20, height: 20, backgroundColor: Colors.light.textInputBorder, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginLeft: 2}}><Text style={{fontSize: 20, lineHeight: 20}}>+</Text></TouchableOpacity>
      </ThemedView>
      <TouchableOpacity onPress={() => dispatch(removeItemFromCart({productId: item.product.id}))}><ThemedText style={{color: 'red'}}>x</ThemedText></TouchableOpacity>
    </ThemedView>
  ), [cartItems])

  const renderOnEmpty = useCallback(() => (
    <ThemedView style={{width: width-40, height: height-75, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
      <ThemedText>There are currently no items in cart. Browse our catalog and choose from a variety of products to add to your shopping cart.</ThemedText>
    </ThemedView>
  ), [])

  return (
    <ThemedView style={{flex: 1, paddingTop: StatusBar.currentHeight, position: 'relative'}}>
      <ThemedText style={{fontWeight: 'bold', textAlign: 'center', borderBottomWidth: 1, borderColor: '#fff', padding: 20}}>SHOPPING CART ({cartItems.length})</ThemedText>
      <FlashList
        data={data}
        ListEmptyComponent={renderOnEmpty}
        estimatedItemSize={76}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={renderCartItem} />
      {
        data.length > 0 ?
        <ThemedView style={{position: 'absolute', borderTopWidth: 1, borderColor: '#fff', bottom: 0, left: 0, padding: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', width}}>
            <ThemedText style={{fontSize: 25, fontWeight: 'bold', marginVertical: 10, lineHeight: 35}}>{cartPrice} €</ThemedText>
            <ThemedView style={{flexDirection: 'row', width: width/2, justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={() => router.push('/(drawer)/checkout/checkout')} style={{flexDirection: 'row', height: '100%', width: '100%', backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 10}}>
                    <ThemedText lightColor='#fff' allowFontScaling={true} style={{fontWeight: 'bold', fontSize: 18}}>Proceed to Checkout</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView> : null
      }
    </ThemedView>
  )
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
