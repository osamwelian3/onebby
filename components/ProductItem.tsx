import { StyleSheet, TouchableOpacity, Image, Dimensions, ViewProps } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { ThemedView } from './ThemedView'
import { useRouter } from 'expo-router'
import { IconSymbol } from './ui/IconSymbol'
import { ThemedText } from './ThemedText'
import { Colors } from '@/constants/Colors'
import { Product } from '@/store/product/product'
import axios from 'axios'
import OptimizedImage from './OptimizedImage'

const { width } = Dimensions.get('window')

export type ProductItemProps = ViewProps & {
  item: Product
}

const ProductItem = ({ style, item }: ProductItemProps) => {
  const router = useRouter()

  return (
    <ThemedView
      lightColor="#fff"
      darkColor={Colors.light.tint}
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: 'center',
          marginHorizontal: 3,
          borderRadius: 10,
          padding: 5
        },
        style
      ]}
    >
      <TouchableOpacity activeOpacity={0.8} style={{ position: 'relative', alignItems: 'center' }} onPress={() => router.push(`/(drawer)/product/${item.id}`)}>
        
        <OptimizedImage productId={item.id} imageId={item.id_default_image} style={{width: 100, height: 100}} />

        <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0, borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: "#641691" }}>
          <IconSymbol name="favorite-border" size={10} />
        </TouchableOpacity>

        <ThemedText numberOfLines={3} style={{ textAlign: 'center', marginBottom: 5, fontSize: 12, lineHeight: 13 }}>
          {item.name}
        </ThemedText>

        <ThemedText style={{ textAlign: 'center', fontWeight: '900', fontSize: 14 }}>
          {Number(item.price).toFixed(2)} <ThemedText ignore={true}>€</ThemedText>
        </ThemedText>

      </TouchableOpacity>
    </ThemedView>
  )
}

export default memo(ProductItem)

const styles = StyleSheet.create({})
