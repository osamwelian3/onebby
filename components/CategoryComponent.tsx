import { Dimensions, StyleSheet, Text, ToastAndroid, View, ViewProps } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ThemedView } from './ThemedView'
import { useAppSelector } from '@/store';
import { GroupedProducts, groupProductsByCategory } from '@/utils/util';
import CategoryLayout from './category_layout';
import { FlatList } from 'react-native-gesture-handler';
import { FlashList } from '@shopify/flash-list';

const {width, height} = Dimensions.get('window')

const CategoryComponent = () => {
  console.log('Category Component')
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts[]>([]);
  const categories = useAppSelector((state) => state.category.categories);
  const categoriesLoading = useAppSelector((state) => state.category.loading);
  const products = useAppSelector((state) => state.product.products);
  const productsLoading = useAppSelector((state) => state.product.loading);

  useEffect(() => {
    if (!categoriesLoading && categories.length > 0) {
        if (!productsLoading && products.length > 0) {
          ToastAndroid.show("Starting Processing", ToastAndroid.SHORT);
          setGroupedProducts(groupProductsByCategory(products, categories))
          ToastAndroid.show("Processing Complete", ToastAndroid.LONG);
        }
    }
  }, [categories, categoriesLoading, products, productsLoading])

  const data = useMemo(() => groupedProducts, [groupedProducts])

  type RenderItemProps = ViewProps & {
    item: GroupedProducts,
    index: Number
  }

  const renderItem = useCallback(({item}: RenderItemProps) => {
    return (
        <CategoryLayout item={item} />
    )
  }, [])

  return (
    <ThemedView>
        <FlashList
         data={data}
         estimatedItemSize={100}
         showsVerticalScrollIndicator={false}
         estimatedListSize={{height: (3.5/4)*height,width}}
         keyExtractor={(item) => item.category.id.toString()}
         renderItem={renderItem}/>
    </ThemedView>
  )
}

export default memo(CategoryComponent)

const styles = StyleSheet.create({})