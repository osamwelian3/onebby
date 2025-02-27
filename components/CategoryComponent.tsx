import { ActivityIndicator, Dimensions, StyleSheet, Text, ToastAndroid, View, ViewProps } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ThemedView } from './ThemedView'
import { useAppSelector } from '@/store';
import { GroupedProducts, groupProductsByCategory } from '@/utils/util';
import CategoryLayout from './category_layout';
import CarouselView from '@/components/carousel'
import { FlashList } from '@shopify/flash-list';

const {width, height} = Dimensions.get('window')

const CategoryComponent = () => {
  console.log('Category Component')
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts[]>([]);
  const categories = useAppSelector((state) => state.category.categories);
  const categoriesLoading = useAppSelector((state) => state.category.loading);
  const products = useAppSelector((state) => state.product.products);
  const productsLoading = useAppSelector((state) => state.product.loading);

  console.log('Categories: ', JSON.stringify(categories).length)

  console.log('Products: ', JSON.stringify(products).length)

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

  const renderCarousel = useCallback(() => <CarouselView />, [])

  if (groupedProducts.length === 0) {
    return (
      <ActivityIndicator size={'large'}  />
    )
  }

  return (
    <ThemedView>
        <FlashList
         data={data}
         estimatedItemSize={100}
         ListHeaderComponent={renderCarousel}
         showsVerticalScrollIndicator={false}
         estimatedListSize={{height: (3.8/4)*height,width}}
         keyExtractor={(item) => item.category.id.toString()}
         renderItem={renderItem}/>
    </ThemedView>
  )
}

export default memo(CategoryComponent)

const styles = StyleSheet.create({})