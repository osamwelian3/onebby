import { StyleSheet, Text, TouchableOpacity, Image, useColorScheme, Dimensions, TextInputProps, NativeSyntheticEvent, TextInputSubmitEditingEventData, TextInput } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { ThemedView } from './ThemedView';
import { ThemedTextInput } from './ThemedTextInput';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import Badge from './Badge';
import { useAppSelector } from '@/store';

const {width, height} = Dimensions.get('window');

const Header = ({leftIcon = 'logo', setSearchQuery, onSubmitSearch, editable = false}: {leftIcon?: 'logo' | 'back', setSearchQuery?: Dispatch<SetStateAction<string|undefined>>, onSubmitSearch?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => null, editable?: boolean}) => {
    const navigation = useNavigation();
    const router = useRouter();
    const searchInputRef = useRef<TextInput>(null);
    const [cartTotal, setCartTotal] = useState<{totalCount: number, totalPrice: number}>()
    const cartItems = useAppSelector((state) => state.cart.cartItems)
    const cartItemsCount = cartItems.map((it) => Number(Number(it.count).toFixed(0))).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    useEffect(() => {
      searchInputRef?.current?.focus()
    }, [])
  return (
    <ThemedView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width-20, position: 'sticky'}}>
        {leftIcon === 'logo' ? <TouchableOpacity activeOpacity={1} onPress={() => navigation.openDrawer()}>
          <ThemedView style={{padding: 10}}>
            <Image source={require('@/assets/images/onebby_logo.jpg')} style={{width: 40, height: 40}} />
          </ThemedView>
        </TouchableOpacity> : null}
        {
          leftIcon === 'back' ? <TouchableOpacity activeOpacity={1} onPress={() => router.back()}>
          <ThemedView style={{padding: 10}}>
            <IconSymbol name='back-arrow' size={30} color={useColorScheme() === 'dark' ? Colors.dark.text : Colors.light.text} />
          </ThemedView>
        </TouchableOpacity> : null
        }
        <TouchableOpacity activeOpacity={1} onPress={() => !editable ? router.push('/search/search') : null}>
          <ThemedTextInput 
            ref={searchInputRef}
            placeholder="Cerca..."
            type="outlined"
            enterKeyHint='search'
            returnKeyType='search'
            inputMode='search'
            autoFocus={editable}
            editable={editable}
            onChangeText={(text) => setSearchQuery ? setSearchQuery(text) : null}
            onSubmitEditing={(e) => onSubmitSearch ? onSubmitSearch(e) : null}
            leftIcon={<IconSymbol name='search' size={20} color={useColorScheme() === 'light' ? Colors.dark.background : Colors.light.background} />}
            style={{ marginTop: 5, padding: 8, width: width/1.5, lineHeight: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(drawer)/(tabs)/cart')}>
          <ThemedView style={{padding: 10, position: 'relative'}}>
            <IconSymbol name='cart' size={30} color={useColorScheme() === 'light' ? Colors.dark.background : Colors.light.background} />
            <Badge count={cartItemsCount} size={15} />
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>
  )
}

export default Header

const styles = StyleSheet.create({})