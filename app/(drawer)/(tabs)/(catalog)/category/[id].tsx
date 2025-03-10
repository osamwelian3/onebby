import { Alert, Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import ProductItem from '@/components/ProductItem';
import { FlatList } from 'react-native-gesture-handler';
import { FlashList } from '@shopify/flash-list';
import { Product } from '@/store/product/product';
import { useAppSelector } from '@/store';
import { Category } from '@/store/category/category';
import { GroupedProducts, groupProductsByCategory } from '@/utils/util';
import Header from '@/components/Header';

const {width, height} = Dimensions.get('window');

const CategoryLayoutScreen = () => {
    const { id } = useLocalSearchParams();
    // const id = '90';
    console.log('Category id: ', id)
    const categor = useAppSelector((state) => state.product.groupedProducts)
    console.log('Categories len: ', JSON.stringify(categor.filter((cat) => cat.category.id.toString() === id), null, 2))
    // Alert.alert('grpd prdcts', 'count: '+categor.length)
    const category = categor.find((item) => item.category.id.toString() === id) as GroupedProducts
    console.log('Category: ', JSON.stringify(category, null, 2))
    console.log('Category name: ', category.category.name)
    // const products = useAppSelector((state) => state.product.products.filter((product) => product.id_category_default === category.id))
    
    const router = useRouter();
    const goBack = useCallback(() => {
      router.back();
    }, [router]);

    const data = useMemo(() => category.products, [category.products, category])

    const renderItem = useCallback(({item}: {item: Product}) => (
      <ProductItem item={item} style={{marginBottom: 20, width: width/2}} />
    ), [])

  return (
    <ThemedView style={styles.root}>
      <Header leftIcon='back' />
      <ThemedView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <ThemedText numberOfLines={1} ellipsizeMode='tail' style={{fontWeight: '900', fontSize: 26, marginTop: 10, padding: 0, verticalAlign: 'middle', textAlignVertical: 'center', paddingVertical: 10 }}>{category.category.name}</ThemedText>
      </ThemedView>
      <ThemedView style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{borderWidth: 1, borderColor: useColorScheme() === 'light' ? Colors.dark.background : Colors.light.background, width: 30, borderRadius: 10 }}>
          <IconSymbol name='filter-list' size={30} color={useColorScheme() === 'light' ? Colors.dark.background : Colors.light.background} />
        </TouchableOpacity>
        <ThemedText>  Filter</ThemedText>
      </ThemedView>
      <ThemedView style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
        <FlashList
          data={data}
          showsVerticalScrollIndicator={false}
          // estimatedItemSize={data.length-1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem} 
          numColumns={2}
          style={{
            height: '100%'
          }}
        />
      </ThemedView>
    </ThemedView>
  )
}

export default CategoryLayoutScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 5,
        paddingBottom: 0
    }
})