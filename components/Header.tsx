import { StyleSheet, Text, TouchableOpacity, Image, useColorScheme, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { ThemedView } from './ThemedView';
import { ThemedTextInput } from './ThemedTextInput';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';

const {width, height} = Dimensions.get('window');

const Header = ({leftIcon = 'logo'}: {leftIcon?: 'logo' | 'back'}) => {
    const navigation = useNavigation();
    const router = useRouter();
  return (
    <ThemedView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: width-20, position: 'sticky'}}>
        {leftIcon === 'logo' && <TouchableOpacity activeOpacity={1} onPress={() => navigation.openDrawer()}>
          <ThemedView style={{padding: 10}}>
            {/* <IconSymbol name='back-arrow' size={30} /> */}
            <Image source={require('@/assets/images/onebby_logo.jpg')} style={{width: 40, height: 40}} />
          </ThemedView>
        </TouchableOpacity>}
        {
          leftIcon === 'back' && <TouchableOpacity activeOpacity={1} onPress={() => router.back()}>
          <ThemedView style={{padding: 10}}>
            <IconSymbol name='back-arrow' size={30} color={useColorScheme() === 'dark' ? Colors.dark.text : Colors.light.text} />
            {/* <Image source={require('@/assets/images/onebby_logo.jpg')} style={{width: 40, height: 40}} /> */}
          </ThemedView>
        </TouchableOpacity>
        }
        <ThemedTextInput 
          placeholder="Cerca..."
          type="outlined"
          leftIcon={<IconSymbol name='search' size={20} color={useColorScheme() === 'light' ? Colors.dark.background : Colors.light.background} />}
          style={{ marginTop: 5, padding: 10, width: width/1.5, lineHeight: 20 }}
        />
        <TouchableOpacity>
          <ThemedView style={{padding: 10}}>
            <IconSymbol name='cart' size={30} color={useColorScheme() === 'light' ? Colors.dark.background : Colors.light.background} />
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>
  )
}

export default Header

const styles = StyleSheet.create({})