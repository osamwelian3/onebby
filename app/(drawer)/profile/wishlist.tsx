import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { FlashList } from '@shopify/flash-list'
import { Product } from '@/store/product/product'
import ProductItem from '@/components/ProductItem'
import { useRouter } from 'expo-router'
import { useAppSelector } from '@/store'

const {width, height} = Dimensions.get('window')

const Wishlist = () => {
    const router = useRouter()
    const colorScheme = useColorScheme()
    const wishlist = useAppSelector((state) => state.product.wishlist)

    const data = useMemo(() => wishlist, [wishlist]);

    const renderWishlist = useCallback(({item}: {item: Product}) => (
        <ProductItem key={item.id.toString()} wishlist={true} item={item} style={{width: width/3, marginBottom: 10}} />
    ), [])

  return (
    <ThemedView style={styles.root}>
        <ThemedView style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between', width: '60%', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => router.back()}>
                <IconSymbol name='back-arrow' color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} size={20} />
            </TouchableOpacity>
            <ThemedView>
                <ThemedText>Wishlist</ThemedText>
                <ThemedText style={{fontSize: 10, fontStyle: 'italic'}}>My wishlist</ThemedText>
            </ThemedView>
        </ThemedView>
        <View style={{backgroundColor: '#fff', height: 1}}></View>
        <ThemedView style={{flex: 1, padding: 10}}>
            <FlashList 
                data={data}
                numColumns={3}
                ListEmptyComponent={() => (
                    <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ThemedText>Your wishlist is empty</ThemedText>
                    </ThemedView>
                )}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderWishlist}/>
        </ThemedView>
    </ThemedView>
  )
}

export default Wishlist

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    }
})