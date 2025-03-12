import { Dimensions, StatusBar, StyleSheet, ToastAndroid, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { addToHistory, Product } from '@/store/product/product'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { router, useLocalSearchParams, useRouter } from 'expo-router'
import { useAppDispatch, useAppSelector } from '@/store'
import { Category } from '@/store/category/category'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import Header from '@/components/Header'
import OptimizedImage from '@/components/OptimizedImage'
import { FlashList } from '@shopify/flash-list'
import Badge from '@/components/Badge'
import { logCarts, setCartItem } from '@/store/cart/cart'
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel'
import { useSharedValue } from 'react-native-reanimated'

const {width, height} = Dimensions.get('window');

const ProductDetails = ({product: prod}: {product: Product}) => {
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const { id } = useLocalSearchParams();
    const dispatch = useAppDispatch();
    const product = useAppSelector((state) => state.product.products.find((product) => product.id.toString() === id)) || prod
    // const category = useAppSelector((state) => state.category.categories.find((category) => category.id === product.id_category_default)) as Category;
    // console.log(useAppSelector((state) => state.cart.carts).size)
    const cartCount = useAppSelector((state) => state.cart.cartItems.find((it) => it.product.id === product.id)?.count) || 0;
    // const cartCount = carts && carts.length < 1 ? 0 : carts.find((it) => it.id === product.id)?.count || 0;
    const colorScheme = useColorScheme()

    useEffect(() => {
        dispatch(addToHistory(product))
    }, [product])

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };

    const renderPage = useCallback(() => {
        return (
            <>
                <ThemedView style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedView style={{marginBottom: 10, width: width*0.85, height: width*0.75, borderRadius: 20, backgroundColor: colorScheme === 'light' ? '#fff' : Colors.dark.text,}}>
                        <Carousel
                        ref={ref}
                        width={width*0.85}
                        height={width*0.75}
                        containerStyle={{
                            width: width*0.85, height: width*0.75
                        }}
                        data={[product, product, product, product, product, product, product, product, product]}
                        onProgressChange={progress}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                flex: 1,
                                width: width*0.85,
                                height: width*0.75,
                                justifyContent: "center",
                                }}
                            >
                                <TouchableOpacity activeOpacity={1} onPress={() => null}>
                                    <OptimizedImage productId={item.id} imageId={item.id_default_image} style={{width: '100%', height: '100%', borderRadius: 20}} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    </ThemedView>
                    <Pagination.Custom
                        progress={progress}
                        data={[product, product, product, product, product, product, product, product, product]}
                        dotStyle={{ borderRadius: 2, width: width*0.85/9, height: width*0.85/9 }}
                        renderItem={(item, index) => (
                            <OptimizedImage key={index} productId={item.id} imageId={item.id_default_image} style={{width: width*0.85/9, height: width*0.85/9}}  />
                        )}
                        containerStyle={{ gap: 5, marginTop: 3, width: width*0.85, overflow: 'scroll' }}
                        onPress={onPressPagination}
                    />
                    <ThemedText style={{fontSize: 18, marginVertical: 10, width: width/1.2}}>{product.name.toUpperCase()}</ThemedText>
                    <ThemedText style={{width: width/1.3, fontSize: 12}}>{product.description}</ThemedText>
                </ThemedView>
            </>
        )
    }, [product])

    return (
        <ThemedView style={styles.root}>
            <Header leftIcon='back' />
            <FlashList 
                data={[]}
                estimatedItemSize={1}
                ListEmptyComponent={renderPage}
                showsVerticalScrollIndicator={false}
                renderItem={() => <></>}/>

            <ThemedView style={{position: 'absolute', borderTopWidth: 1, borderColor: '#fff', bottom: 0, left: 0, padding: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', width}}>
                <ThemedText style={{fontSize: 25, fontWeight: 'bold', marginVertical: 10, lineHeight: 35}}>{Number(product.price).toFixed(2)} €</ThemedText>
                <ThemedView style={{flexDirection: 'row', width: width/2}}>
                    <TouchableOpacity onPress={() => cartCount < 1 ? dispatch(setCartItem(product)) : ToastAndroid.show('Already added to cart', ToastAndroid.SHORT)} style={{height: '100%', width: '40%', backgroundColor: Colors.light.textInputBorder, justifyContent: 'center', alignItems: 'center', padding: 10, borderStartStartRadius: 10, borderStartEndRadius: 10}}>
                        <IconSymbol name='cart' size={30} color={'#fff'} />
                        <Badge count={cartCount} color={colorScheme === 'dark' ? 'black' : 'white'} style={{top: 2, right: 2}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/(drawer)/checkout/checkout')} style={{flexDirection: 'row', height: '100%', width: '60%', backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', padding: 10, borderEndEndRadius: 10, borderEndStartRadius: 10}}>
                        <ThemedText lightColor='#fff' allowFontScaling={true} style={{fontWeight: 'bold', fontSize: 23}}>Buy Now</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 10,
        position: 'relative'
    }
})