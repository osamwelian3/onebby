import { StyleSheet, Text, View, ViewProps } from 'react-native'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { ThemedView } from './ThemedView'
import { useAppSelector } from '@/store';
import { GroupedProducts, groupProductsByCategory } from '@/utils/util';
import CategoryLayout from './category_layout';
import { FlatList } from 'react-native-gesture-handler';
import { FlashList } from '@shopify/flash-list';

const CategoryComponent = () => {
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts[]>([]);
  const categories = useAppSelector((state) => state.category.categories);
  const categoriesLoading = useAppSelector((state) => state.category.loading);
  const products = useAppSelector((state) => state.product.products);
  const productsLoading = useAppSelector((state) => state.product.loading);

  useEffect(() => {
    if (!categoriesLoading && categories.length > 0) {
        if (!productsLoading && products.length > 0) {
            setGroupedProducts(groupProductsByCategory(products, categories))
        }
    }
  }, [categories, categoriesLoading, products, productsLoading])

  const data = useMemo(() => groupedProducts, [groupedProducts])

  type RenderItemProps = ViewProps & {
    item: GroupedProducts,
    index: Number
  }

  const renderItem = ({item}: RenderItemProps) => {
    return (
        <CategoryLayout item={item} />
    )
  }

  return (
    <ThemedView>
        <FlashList
         data={data}
         estimatedItemSize={10}
         keyExtractor={(item) => item.category.id.toString()}
         renderItem={renderItem}/>
        
    </ThemedView>
  )
}

export default CategoryComponent

const styles = StyleSheet.create({})