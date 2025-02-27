import { Dimensions, ImageProps, StatusBar, StyleProp, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect } from 'react'
import { Product } from '@/store/product/product'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { useAppSelector } from '@/store'
import { Category } from '@/store/category/category'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import Header from '@/components/Header'
import OptimizedImage from '@/components/OptimizedImage'
import translateText from '@/utils/translate'

const {width, height} = Dimensions.get('window');

const ProductDetails = ({product: prod}: {product: Product}) => {
    const { id } = useLocalSearchParams();
    const product = useAppSelector((state) => state.product.products.find((product) => product.id.toString() === id)) || prod
    const category = useAppSelector((state) => state.category.categories.find((category) => category.id === product.id_category_default)) as Category;

    useEffect(() => {
        translateText(product.name, 'en')
            .then((text) => {
                console.log("Translated text: ", text)
            })
            .catch((error) => {
                console.log('Translation error: ', error)
            })
    }, [])

    return (
        <ThemedView style={styles.root}>
            {/* <ThemedText style={{flexDirection: 'row', width: width}}>
                <TouchableOpacity><ThemedText style={{verticalAlign: 'middle', alignItems: 'center', }}>Home</ThemedText></TouchableOpacity>
                <ThemedText>/</ThemedText>
                <TouchableOpacity><ThemedText style={{verticalAlign: 'middle', alignItems: 'center', }}>{category.name}</ThemedText></TouchableOpacity>
                <ThemedText>/</ThemedText>
                <ThemedText numberOfLines={1} ellipsizeMode='tail'>{product.name}</ThemedText>
            </ThemedText> */}
            <Header leftIcon='back' />
            <ThemedView style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                <ThemedView style={{marginBottom: 20, width: width*0.85, height: width*0.75, borderRadius: 20, backgroundColor: useColorScheme() === 'light' ? '#fff' : Colors.dark.text,}}>
                    <OptimizedImage productId={product.id} imageId={product.id_default_image} style={{width: '100%', height: '100%', borderRadius: 20}} />
                </ThemedView>
                <ThemedText style={{fontSize: 18, marginVertical: 10, width: width/1.2}}>{product.name.toUpperCase()}</ThemedText>
                <ThemedText style={{fontWeight: 'bold', width: width/1.3, fontSize: 24}}>{Number(product.price).toFixed(2)} €</ThemedText>
                {/* <ThemedText>{product.description}</ThemedText> */}
            </ThemedView>
        </ThemedView>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 10
    }
})