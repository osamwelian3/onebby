import { ActivityIndicator, Dimensions, StyleSheet, Text, ToastAndroid, View, ViewProps } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ThemedView } from './ThemedView'
import { useAppDispatch, useAppSelector } from '@/store';
import { GroupedProducts, groupProductsByCategory } from '@/utils/util';
import CategoryLayout from './category_layout';
import CarouselView from '@/components/carousel'
import { FlashList } from '@shopify/flash-list';
import { setAppGroupedProducts } from '@/store/product/product';
import { ThemedText } from './ThemedText';

const {width, height} = Dimensions.get('window')

const CategoryComponent = () => {
  console.log('Category Component')
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts[]>([]);
  const categories = useAppSelector((state) => state.category.categories);
  const categoriesLoading = useAppSelector((state) => state.category.loading);
  const products = useAppSelector((state) => state.product.products);
  const productsLoading = useAppSelector((state) => state.product.loading);
  const dispatch = useAppDispatch()

  console.log('Categories: ', JSON.stringify(categories).length)

  console.log('Products: ', JSON.stringify(products).length)

  useEffect(() => {
    if (!categoriesLoading && categories.length > 0) {
        if (!productsLoading && products.length > 0) {
          try {
            // ToastAndroid.show("Starting Processing", ToastAndroid.SHORT);
            const gp = groupProductsByCategory(products, categories)
            setGroupedProducts(gp)
            dispatch(setAppGroupedProducts(gp))
  
            // ToastAndroid.show("Processing Complete", ToastAndroid.LONG);
          } catch (error) {
            if (error instanceof Error) {
              console.log('GroupProductsByCategory Error: ', error.message)
            }
          }
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

  return (
    <>
      { data.length > 0 ?
        <ThemedView>
          <FlashList
          data={data}
          //  estimatedItemSize={100}
          ListHeaderComponent={renderCarousel}
          showsVerticalScrollIndicator={false}
          //  estimatedListSize={{height: (3.8/4)*height,width}}
          keyExtractor={(item) => item.category.id.toString()}
          renderItem={renderItem}/>
        </ThemedView> 
        :
        <ActivityIndicator size={'large'} />
      }
    
    </>
  )
}

export default memo(CategoryComponent)

const styles = StyleSheet.create({})