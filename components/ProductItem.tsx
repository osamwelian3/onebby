import { StyleSheet, TouchableOpacity, Image, Dimensions, ViewProps } from 'react-native'
import React from 'react'
import { ThemedView } from './ThemedView'
import { useRouter } from 'expo-router'
import { Product } from '@/constants/types'
import { IconSymbol } from './ui/IconSymbol'
import { ThemedText } from './ThemedText'
import { Colors } from '@/constants/Colors'

const {width, height} = Dimensions.get('window')

export type ProductItemProps = ViewProps & {
    item: Product
}

const ProductItem = ({style, item}: ProductItemProps) => {
  const router = useRouter();  
  return (
    <ThemedView
        lightColor="#fff"
        darkColor={Colors.light.tint}
        style={[{
            flex: 1,
            justifyContent: "center",
            alignItems: 'center',
            marginHorizontal: 10,
            borderRadius: 10,
            padding: 10
        }, style]}
        >
        <TouchableOpacity activeOpacity={0.8} style={{position: 'relative', alignItems: 'center'}}>
            <Image source={{uri: item.image}} resizeMode='contain' style={{width: width/3, height: width/3, borderRadius: 10}} />
            <ThemedView style={{position: 'absolute', right: 10, top: 10, borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: "#641691"}}>
            <IconSymbol name="favorite-border" size={20} />
            </ThemedView>
            <ThemedText numberOfLines={3} style={{textAlign: 'center', marginBottom: 10}}>{item.name}</ThemedText>
            <ThemedText style={{textAlign: 'center', fontWeight: '900'}}>{item.price.toString()} <ThemedText>€</ThemedText></ThemedText>
        </TouchableOpacity>
    </ThemedView>
  )
}

export default ProductItem

const styles = StyleSheet.create({})