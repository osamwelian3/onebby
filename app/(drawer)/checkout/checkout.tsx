import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useAppSelector } from '@/store'
import { CartItem } from '@/store/cart/cart'
import OptimizedImage from '@/components/OptimizedImage'
import { FlashList } from '@shopify/flash-list'
import { Ionicons } from '@expo/vector-icons'

const {width, height} = Dimensions.get('window')

const Checkout = () => {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const cartItems = useAppSelector((state) => state.cart.cartItems)
  const [successModal, setSuccessModal] = useState<'flex' | 'none'>('none')
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card' | 'wallet' | 'mobile'>('card')

  const cartPrice = cartItems.map((it) => Number((Number(it.product.price)*it.count).toFixed(2))).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2)

  const showSuccessModal = () => {
    setSuccessModal('flex')
    setTimeout(() => {
      setSuccessModal('none')
    }, 3000);
  }

  const renderAddress = useCallback(() => (
    <ThemedView style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderRadius: 10, borderColor: '#fff'}}>
      <Ionicons name='location-sharp' size={20} color={'red'} />
      <ThemedView>
        <ThemedText style={{fontWeight: 'bold'}}>Shipping Address</ThemedText>
        <ThemedText style={{fontStyle: 'italic', fontSize: 12, lineHeight: 12}}>Full Name (Phone number)</ThemedText>
        <ThemedText style={{fontStyle: 'italic', fontSize: 12, lineHeight: 12}}>City Center Plaza, 25 Ave</ThemedText>
      </ThemedView>
    </ThemedView>
  ), [])

  const renderPayment = useCallback(() => (
    <ThemedView style={{borderWidth: 1, borderColor: '#fff', borderRadius: 10, alignItems: 'center', marginVertical: 5, padding: 10}}>
      <ThemedView style={{width: '100%', marginBottom: 10}}>
        <ThemedText style={{fontWeight: 'bold'}}>Payment Method</ThemedText>
        <ThemedText style={{fontStyle: 'italic', fontSize: 12, lineHeight: 12}}>100% Money Back Guarantee</ThemedText>
      </ThemedView>
      <ThemedView style={{backgroundColor: '#fff', height: 1, width: '100%'}}></ThemedView>
      <TouchableOpacity onPress={() => setPaymentMethod('paypal')}>
        <ThemedView style={{width: '100%', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <ThemedView style={{width: '80%'}}>
            <ThemedText style={{}}>PayPal</ThemedText>
            <ThemedText style={{fontStyle: 'italic', fontSize: 12, lineHeight: 12}}>Pay with Paypal</ThemedText>
          </ThemedView>
          {
            paymentMethod === 'paypal' ?
            <Ionicons name='checkmark-circle' size={20} color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} />
            :
            <Ionicons name='checkmark-circle' size={17} color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} style={{backgroundColor: colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon, borderRadius: 20}} />
          }
        </ThemedView>
      </TouchableOpacity>
      <ThemedView style={{backgroundColor: '#fff', height: 1, width: '100%'}}></ThemedView>
      <TouchableOpacity onPress={() => setPaymentMethod('card')}>
        <ThemedView style={{width: '100%', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <ThemedView style={{width: '80%'}}>
            <ThemedText style={{}}>Debit/Credit Card</ThemedText>
            <ThemedText style={{fontStyle: 'italic', fontSize: 12, lineHeight: 12}}>Pay with visa/mastercard/amex cards</ThemedText>
          </ThemedView>
          {
            paymentMethod === 'card' ?
            <Ionicons name='checkmark-circle' size={20} color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} />
            :
            <Ionicons name='checkmark-circle' size={17} color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} style={{backgroundColor: colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon, borderRadius: 20}} />
          }
        </ThemedView>
      </TouchableOpacity>
      <ThemedView style={{backgroundColor: '#fff', height: 1, width: '100%'}}></ThemedView>
      <TouchableOpacity onPress={() => setPaymentMethod('wallet')}>
        <ThemedView style={{width: '100%', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <ThemedView style={{width: '80%'}}>
            <ThemedText style={{}}>Onebby Wallet</ThemedText>
            <ThemedText style={{fontStyle: 'italic', fontSize: 12, lineHeight: 12}}>Use your onebby wallet balance</ThemedText>
          </ThemedView>
          {
            paymentMethod === 'wallet' ?
            <Ionicons name='checkmark-circle' size={20} color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} />
            :
            <Ionicons name='checkmark-circle' size={17} color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} style={{backgroundColor: colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon, borderRadius: 20}} />
          }
        </ThemedView>
      </TouchableOpacity>
      <ThemedView style={{backgroundColor: '#fff', height: 1, width: '100%'}}></ThemedView>
      <TouchableOpacity onPress={() => setPaymentMethod('mobile')}>
        <ThemedView style={{width: '100%', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <ThemedView style={{width: '80%'}}>
            <ThemedText style={{}}>Mobile Money</ThemedText>
            <ThemedText style={{fontStyle: 'italic', fontSize: 12, lineHeight: 12}}>Pay with mobile money</ThemedText>
          </ThemedView>
          {
            paymentMethod === 'mobile' ?
            <Ionicons name='checkmark-circle' size={20} color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} />
            :
            <Ionicons name='checkmark-circle' size={17} color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} style={{backgroundColor: colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon, borderRadius: 20}} />
          }
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  ), [paymentMethod])

  const data = useMemo(() => {
    const items = [renderAddress, renderPayment, ...cartItems]
    return items
  }, [cartItems])

  const renderCheckoutItem = useCallback(({item}: {item: typeof data[0]}) => (
    <>
      {
        'product' in item ?
        <ThemedView style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: width-20, borderWidth: 1, borderColor: '#fff', marginVertical: 5}}>
          <OptimizedImage productId={item.product.id} imageId={item.product.id_default_image} style={{width: width*0.20, height: width*0.20, borderRadius: 5}} />
          <ThemedView style={{justifyContent: 'space-between', width: width*0.5, height: width*0.20, padding: 10}}>
            <ThemedText numberOfLines={2} ellipsizeMode='tail' style={{width: '100%', fontSize: 12}}>{item.product.name}</ThemedText>
          </ThemedView>
          <ThemedView style={{justifyContent: 'space-between', width: width*0.20, height: width*0.20, padding: 10}}>
            <ThemedText style={{fontWeight: 'bold', fontSize: 12}}>{Number(item.product.price).toFixed(2)+' €'} </ThemedText>
            <ThemedText style={{fontWeight: 'bold', fontSize: 12}}>x{item.count}</ThemedText>
          </ThemedView>
        </ThemedView>
        :
        item()
      }
    </>
  ), [paymentMethod])

  const renderFooter = useCallback(() => (
    <ThemedView style={{flex: 1, justifyContent: 'center', margin: 10, padding: 10, borderWidth: 1, borderRadius: 10}}>
      <ThemedText style={{fontWeight: 'bold'}}>Total</ThemedText>
      <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ThemedText>Products Amount: </ThemedText>
        <ThemedText style={{fontWeight: 'bold', marginVertical: 10}}>{cartPrice} €</ThemedText>
      </ThemedView>
      <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ThemedText>Shipping Fee: </ThemedText>
        <ThemedText style={{fontSize: 12, fontWeight: 'bold', marginVertical: 10}}>0.00 €</ThemedText>
      </ThemedView>
      <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ThemedText>Payment Amount: </ThemedText>
        <ThemedText style={{fontWeight: 'bold', marginVertical: 10, color: Colors.dark.textInputBorder}}>{cartPrice} €</ThemedText>
      </ThemedView>
    </ThemedView>
  ), [])

  return (
    <ThemedView style={styles.root}>
        <ThemedView style={{display: successModal, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10, backgroundColor: Colors.dark.textInputBorder, padding: 20, position: 'absolute', top: '50%', left: '25%', right: '25%', zIndex: 999}}>
          <Ionicons name='checkmark-circle' color={'green'} size={50} />
          <ThemedText style={{textAlign: 'center'}}>Order Placed</ThemedText>
        </ThemedView>
        <ThemedView style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between', width: '60%', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => router.back()}>
              <IconSymbol name='back-arrow' color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} size={20} />
          </TouchableOpacity>
          <ThemedView>
              <ThemedText>Checkout</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={{flex: 1, margin: 10, marginBottom: 50}}>
          <FlashList
            data={data}
            StickyHeaderComponent={() => <ThemedText style={{fontWeight: 'bold', textAlign: 'center', borderBottomWidth: 1, borderColor: '#fff', padding: 20}}>SHOPPING CART ({cartItems.length})</ThemedText>}
            stickyHeaderHiddenOnScroll={true}
            stickyHeaderIndices={[0]}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            renderItem={renderCheckoutItem} />
        </ThemedView>
        {
        data.length > 0 ?
        <ThemedView style={{position: 'absolute', borderTopWidth: 1, borderColor: '#fff', bottom: 0, left: 0, padding: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', width}}>
            <ThemedText style={{fontSize: 25, fontWeight: 'bold', marginVertical: 10, lineHeight: 35}}>{cartPrice} €</ThemedText>
            <ThemedView style={{flexDirection: 'row', width: width/2, justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={() => showSuccessModal()} style={{flexDirection: 'row', height: '100%', width: '100%', backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 10}}>
                    <ThemedText lightColor='#fff' allowFontScaling={true} style={{fontWeight: 'bold', fontSize: 18}}>Place Order</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView> : null
      }
    </ThemedView>
  )
}

export default Checkout

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        position: 'relative'
    }
})