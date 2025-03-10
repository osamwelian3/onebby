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

export type SearchProductItemProps = ViewProps & {
  item: Product
}

const SearchProductItem = ({ style, item }: SearchProductItemProps) => {
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
          marginHorizontal: 10,
          borderRadius: 10,
          padding: 10,
          margin: 2,
          overflow: 'hidden',
        },
        style
      ]}
    >
      <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center', flexDirection: 'row' }} onPress={() => router.push(`/(drawer)/product/${item.id}`)}>
        
        <ThemedView style={{ backgroundColor: 'transparent', height: '100%', width: '30%', justifyContent: 'center'}}>
          <OptimizedImage productId={item.id} imageId={item.id_default_image} style={{width: '100%', height: 50}} />
        </ThemedView>

        <ThemedView lightColor='#fff' style={{width: '70%'}}>

          <ThemedText numberOfLines={3} style={{ textAlign: 'center', marginBottom: 10, fontSize: 12, lineHeight: 12, width: '100%' }}>
            {item.name}
          </ThemedText>
        </ThemedView>

      </TouchableOpacity>
    </ThemedView>
  )
}

export default memo(SearchProductItem)

const styles = StyleSheet.create({})
