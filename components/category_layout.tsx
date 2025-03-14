import { Dimensions, StyleSheet, Text, View, ViewProps } from 'react-native'
import React, { memo } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import ProductsCarousel from './products_carousel';
import { Product } from '@/constants/types';
import { GroupedProducts } from '@/utils/util';

const {width, height} = Dimensions.get('window');

type CategoryLayoutProps = ViewProps & {
    item: GroupedProducts
}

const CategoryLayout = ({item}: CategoryLayoutProps) => {
    console.log('CategoryLayout')
  return (
    <ThemedView>
        <ThemedView style={{marginTop: 5, marginHorizontal: 10}}>
            <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
                <ThemedText allowFontScaling style={{fontWeight: 'bold', fontSize: 16, verticalAlign: 'middle', paddingVertical: 10}}>{item.category.name} </ThemedText>
                <ThemedView style={{height: 2, width: width/3, margin: 10, backgroundColor: '#641691' }}></ThemedView>
            </ThemedView>
            <ThemedText numberOfLines={3} ellipsizeMode='tail' style={{color: "#641691", fontSize: 12, marginBottom: 3, lineHeight: 12, display: item.category.description.length > 0 ? 'flex' : 'none'}}>
                {item.category.description}
            </ThemedText>
        </ThemedView>
        <ProductsCarousel products={item.products} />
    </ThemedView>
  )
}

export default memo(CategoryLayout)

const styles = StyleSheet.create({})