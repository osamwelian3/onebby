import { StyleSheet, Text, Image, TouchableOpacity, StatusBar, useColorScheme, Dimensions, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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

const {width, height} = Dimensions.get('window')

const Profile = () => {
  const colorScheme = useColorScheme()
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter()
  const snapPoints = ["40%"]

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

  const renderHistory = useCallback(({item}: {item: any}) => (
    <TouchableOpacity activeOpacity={0.8}>
      <ThemedView style={{alignItems: 'center', marginRight: 15}}>
        <Image source={require('@/assets/images/onebby_logo.jpg')} style={{width: 100, height: 100, borderRadius: 10}} />
        <ThemedText numberOfLines={1} adjustsFontSizeToFit style={{fontSize: 12, width: 100}}>Small Appliances</ThemedText>
        <ThemedText numberOfLines={1} style={{fontStyle: 'italic', fontSize: 10, lineHeight: 10, width: 100, textAlign: 'left'}}>1 Item</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  ), [])

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
        <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()} style={{borderRadius: 10, borderWidth: 1, padding: 5, borderColor: colorScheme === 'dark' ? '#fff' : 'black'}}>
          <ThemedText style={{flex: 0}}>Sign In</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity>
          <IconSymbol name='settings' size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={{borderBottomWidth: 1, borderColor: '#fff', width, padding: 0, margin: 0}}></ThemedView>
      <ThemedView style={{marginHorizontal: 5, padding: 10}}>
        <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15}}>
          <ThemedText>For You</ThemedText>
        </ThemedView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection: 'row', width: width-10, overflow: 'scroll'}}>
          <TouchableOpacity>
            <ThemedView style={{alignItems: 'center', marginRight: 20}}>
              <IconSymbol name='favorite-border' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
              <ThemedText style={{fontSize: 12}}>Favourites</ThemedText>
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
              <IconSymbol name='money' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
              <ThemedText style={{fontSize: 12}}>Tax Information</ThemedText>
            </ThemedView>
          </TouchableOpacity>
          <TouchableOpacity>
            <ThemedView style={{alignItems: 'center', marginRight: 20}}>
              <IconSymbol name='help' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
              <ThemedText style={{fontSize: 12}}>Help Center</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
      <ThemedView style={{borderBottomWidth: 1, borderColor: '#fff', width, padding: 0, margin: 0}}></ThemedView>
      <TouchableOpacity>
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
            data={[1,2,]}
            ListFooterComponent={() => (
              <TouchableOpacity>
              <ThemedView style={{alignItems: 'center', justifyContent: 'center', marginRight: 10, width: 100, height: 100}}>
                <IconSymbol name='forward-arrow' size={50} color={colorScheme === 'dark' ? 'white' : 'black'} />
                <ThemedText numberOfLines={1} adjustsFontSizeToFit style={{fontSize: 12, width: 100, textAlign: 'center'}}>View All</ThemedText>
              </ThemedView>
            </TouchableOpacity>
            )}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderHistory}/>
        </ThemedView>
      </ThemedView>
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