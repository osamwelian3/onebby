import { StyleSheet, Text, Image, TouchableOpacity, StatusBar, useColorScheme, Dimensions, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { ScrollView } from 'react-native-gesture-handler'
import { FlashList } from '@shopify/flash-list'
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet'
import * as AppleAuthentication from 'expo-apple-authentication';
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Product } from '@/store/product/product'
import { useAppSelector } from '@/store'
import OptimizedImage from '@/components/OptimizedImage'

const {width, height} = Dimensions.get('window')

const Profile = () => {
  const colorScheme = useColorScheme()
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter()
  const history = useAppSelector((state) => state.product.history)
  const products = useAppSelector((state) => state.product.products)
  const snapPoints = ["40%"]

  const historyData = useMemo(() => history.slice(0, 2), [history])
  const productsData = useMemo(() => products.slice(0,10), [products])

  useEffect(() => {
    return () => {
      bottomSheetRef.current?.close();
    }
  }, [])

  const renderBackDrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
      />
    )
  }, [])

  const renderHistory = useCallback(({item}: {item: Product}) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => router.push(`/(drawer)/product/${item.id}`)}>
      <ThemedView style={{alignItems: 'center', marginRight: 15}}>
      <OptimizedImage productId={item.id} imageId={item.id_default_image} style={{width: 100, height: 100, borderRadius: 10}} />
        <ThemedText numberOfLines={1} style={{fontSize: 12, width: 100}}>{item.name}</ThemedText>
        <ThemedText numberOfLines={1} style={{fontStyle: 'italic', fontSize: 10, lineHeight: 10, width: 100, textAlign: 'left'}}>{Number(item.price).toFixed(2)} <ThemedText style={{fontSize: 10, lineHeight: 10}} ignore={true}>€</ThemedText></ThemedText>
      </ThemedView>
    </TouchableOpacity>
  ), [])

  const renderDeals = useCallback(({item}: {item: Product}) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => router.push(`/(drawer)/product/${item.id}`)}>
      <ThemedView style={{alignItems: 'center', marginRight: 15, marginBottom: 10}}>
        <OptimizedImage productId={item.id} imageId={item.id_default_image} style={{width: 100, height: 100, borderRadius: 10}} />
        <ThemedText numberOfLines={1} style={{fontSize: 12, width: 100}}>{item.name}</ThemedText>
        <ThemedText numberOfLines={1} style={{fontStyle: 'italic', fontSize: 10, lineHeight: 10, width: 100, textAlign: 'left'}}>{Number(item.price).toFixed(2)} <ThemedText style={{fontSize: 10, lineHeight: 10}} ignore={true}>€</ThemedText></ThemedText>
      </ThemedView>
    </TouchableOpacity>
  ), [])

  const renderPage = () => (
    <ThemedView style={{}}>
      <ThemedView style={{marginHorizontal: 5, padding: 10}}>
        <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15}}>
          <ThemedText>For You</ThemedText>
        </ThemedView>
        <ThemedView style={{flexDirection: 'row', width: width-10, overflow: 'scroll', flexWrap: 'wrap', rowGap: 20}}>
          <TouchableOpacity onPress={() => router.push('/(drawer)/profile/wishlist')}>
            <ThemedView style={{alignItems: 'center', marginRight: 20}}>
              <IconSymbol name='favorite-border' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
              <ThemedText style={{fontSize: 12}}>Wishlist</ThemedText>
            </ThemedView>
          </TouchableOpacity>
          <TouchableOpacity>
            <ThemedView style={{alignItems: 'center', marginRight: 20}}>
              <IconSymbol name='wallet' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
              <ThemedText style={{fontSize: 12}}>Payment</ThemedText>
            </ThemedView>
          </TouchableOpacity>
          <TouchableOpacity>
            <ThemedView style={{alignItems: 'center', marginRight: 20}}>
              <IconSymbol name='location-pin' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
              <ThemedText style={{fontSize: 12}}>Shipping Address</ThemedText>
            </ThemedView>
          </TouchableOpacity>
          <TouchableOpacity>
            <ThemedView style={{alignItems: 'center', marginRight: 20}}>
              <Ionicons name='mail' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
              <ThemedText style={{fontSize: 12}}>Messages</ThemedText>
            </ThemedView>
          </TouchableOpacity>
          <TouchableOpacity>
            <ThemedView style={{alignItems: 'center', marginRight: 20}}>
              <IconSymbol name='help' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
              <ThemedText style={{fontSize: 12}}>Help Center</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      <ThemedView style={{borderBottomWidth: 1, borderColor: '#fff', width, padding: 0, margin: 0}}></ThemedView>
      <TouchableOpacity onPress={() => router.push('/(drawer)/profile/(orders)')}>
        <ThemedView style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
          <ThemedText>My Orders</ThemedText>
          <IconSymbol name='forward-arrow' size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
        </ThemedView>
      </TouchableOpacity>
      <ThemedView style={{borderBottomWidth: 1, borderColor: '#fff', width, padding: 0, margin: 0}}></ThemedView>
      <ThemedView style={{padding: 10}}>
        <ThemedText>Personalized History</ThemedText>
        <ThemedView style={{padding: 10,}}>
          <FlashList 
            data={historyData}
            ListFooterComponent={() => (
              <>
                {
                  historyData.length > 0 ?
                  <TouchableOpacity onPress={() => router.push('/(drawer)/profile/history')}>
                    <ThemedView style={{alignItems: 'center', justifyContent: 'center', marginRight: 10, width: 100, height: 100}}>
                      <IconSymbol name='forward-arrow' size={50} color={colorScheme === 'dark' ? 'white' : 'black'} />
                      <ThemedText numberOfLines={1} adjustsFontSizeToFit style={{fontSize: 12, width: 100, textAlign: 'center'}}>View All</ThemedText>
                    </ThemedView>
                  </TouchableOpacity>
                  : null
                }
              </>
            )}
            ListEmptyComponent={() => (
              <ThemedText style={{textAlign: 'center', fontSize: 12, fontStyle: 'italic'}}>No recent activities</ThemedText>
            )}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderHistory}/>
        </ThemedView>
      </ThemedView>
      <ThemedView style={{borderBottomWidth: 1, borderColor: '#fff', width, padding: 0, margin: 0}}></ThemedView>
      <ThemedView style={{padding: 10}}>
        <ThemedText style={{textAlign: 'center'}}>Hot Deals just for you</ThemedText>
        <ThemedView style={{padding: 10, flex: 1}}>
          <FlashList 
            data={productsData}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderDeals}/>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
        <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()} style={{borderRadius: 10, borderWidth: 1, padding: 5, borderColor: colorScheme === 'dark' ? '#fff' : 'black'}}>
          <ThemedText style={{flex: 0}}>Sign In</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(drawer)/profile/settings')}>
          <IconSymbol name='settings' size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={{borderBottomWidth: 1, borderColor: '#fff', width, padding: 0, margin: 0}}></ThemedView>
      <FlashList
        data={[]}
        ListEmptyComponent={renderPage}
        renderItem={null} />
        <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        backdropComponent={renderBackDrop}
        handleStyle={{
          display: 'none'
        }}
        snapPoints={snapPoints}
        enablePanDownToClose={true}>
          <BottomSheetView>
            <ThemedView darkColor={'#151725'} lightColor={'#fff50'} style={{width: width, padding: 10, height: '100%', borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
              <ThemedText>Sign In or Create account</ThemedText>
              <View style={{alignItems: 'center', marginTop: 20}}>
                <TouchableOpacity>
                  <ThemedView style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '70%', padding: 10, marginHorizontal: 10, borderRadius: 20, borderWidth: 1, marginVertical: 10}}>
                    <Ionicons name={'logo-google'} size={30} color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} />
                    <ThemedText>Login with Google</ThemedText>
                  </ThemedView>
                </TouchableOpacity>
                <TouchableOpacity>
                  <ThemedView style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '70%', padding: 10, marginHorizontal: 10, borderRadius: 20, borderWidth: 1, marginVertical: 10}}>
                    <Ionicons name={'logo-facebook'} size={30} color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} />
                    <ThemedText>Login with Facebook</ThemedText>
                  </ThemedView>
                </TouchableOpacity>
                <ThemedText>OR</ThemedText>
                <TouchableOpacity onPress={() => router.push('/(drawer)/profile/login')}>
                  <ThemedView style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '70%', padding: 10, marginHorizontal: 10, borderRadius: 20, borderWidth: 1, marginVertical: 10}}>
                    <Ionicons name={'mail'} size={30} color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} />
                    <ThemedText>Continue with Email</ThemedText>
                  </ThemedView>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </BottomSheetView>
        </BottomSheet>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        // paddingHorizontal: 10,
        flex: 1
    },
    button: {
      width: 200,
      height: 44,
    },
})