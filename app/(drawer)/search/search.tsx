import { Dimensions, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import Header from '@/components/Header'
import { useAppSelector } from '@/store'
import { Category } from '@/store/category/category'
import { Product } from '@/store/product/product'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ThemedText'
import { FlashList } from '@shopify/flash-list'
import SearchProductItem from '@/components/SearchProductItem'

const {width, height} = Dimensions.get('window')

const Search = () => {
    const [categoryResults, setCategoryResults] = useState<Category[]>()
    const [productsResults, setProductsResults] = useState<Product[]>()
    const [searchQuery, setSearchQuery] = useState<string>()
    const colorScheme = useColorScheme();

    const categories = useAppSelector((state) => state.category.categories)
    const products = useAppSelector((state) => state.product.products)

    useEffect(() => {
        if (searchQuery && searchQuery.length > 3) {
            setCategoryResults(categories.filter((cat) => cat.name.includes(searchQuery) || cat.description.toLowerCase().includes(searchQuery.toLowerCase())))
            setProductsResults(products.filter((prod) => prod.name.includes(searchQuery) || prod.description.toLowerCase().includes(searchQuery.toLowerCase())))
        } else {
            setCategoryResults(undefined)
            setProductsResults(undefined)
        }
    }, [searchQuery])

    const productsData = useMemo(() => productsResults, [productsResults])

    const renderProductResults = useCallback(({item}: {item: Product}) => (
        <SearchProductItem item={item} />
    ), [productsData])

    const randIds = [Math.round(Math.random()*categories.length), Math.round(Math.random()*categories.length), Math.round(Math.random()*categories.length), Math.round(Math.random()*categories.length)]


  return (
    <ThemedView style={styles.root}>
        <Header leftIcon='back' editable={true} setSearchQuery={setSearchQuery} />
        <ThemedView style={{flex: 1}}>
            {
                !categoryResults && !productsResults ? 
                <ThemedView style={{flex: 0, height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <IconSymbol name='search' size={80} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
                    <ThemedText style={{fontStyle: 'italic', textAlign: 'center'}}>Search for all your needs in the worlds #1 digital market place.</ThemedText>
                    <ThemedView style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                        {
                            randIds.map((index) => <>
                                <ThemedText key={index} numberOfLines={3} style={{width: width/3, backgroundColor: colorScheme === 'light' ? Colors.dark.text : Colors.light.text, margin: 5, padding: 5, borderRadius: 5}}>{categories[index]?.name}</ThemedText>
                            </>)
                        }
                    </ThemedView>
                </ThemedView> : null
            }
            {
                productsResults ? 
                <ThemedView style={{ flex: 1, marginHorizontal: 10}}>
                    <FlashList 
                    data={productsData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderProductResults}/>
                </ThemedView> : null
            }
        </ThemedView>
    </ThemedView>
  )
}

export default Search

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        width,
        height
    }
})