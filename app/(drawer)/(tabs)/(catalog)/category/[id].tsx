import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useCallback } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { Product } from '@/constants/types';
import ProductItem from '@/components/ProductItem';
import { FlatList } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const products: Product[] = [
    {id: 0, name: "Whirlpool FFB116SILVERIT Lavatrice 11 KG Centrifuga 1400 Giri Classe A colore Silver - FFB 116 SILVER IT", image: "https://www.onebby.it/87556-home_default/whirlpool-whirlpool-ffb116silverit-lavatrice-11-kg-centrifuga-1400-giri-classe-a-colore-silver-ffb-116-silver-it.jpg", price: 443.58},
    {id: 1, name: "Whirlpool FFB116SILVERIT Lavatrice 11 KG Centrifuga 1400 Giri Classe A colore Silver - FFB 116 SILVER IT", image: "https://www.onebby.it/87556-home_default/whirlpool-whirlpool-ffb116silverit-lavatrice-11-kg-centrifuga-1400-giri-classe-a-colore-silver-ffb-116-silver-it.jpg", price: 443.58},
    {id: 2, name: "Whirlpool FFB116SILVERIT Lavatrice 11 KG Centrifuga 1400 Giri Classe A colore Silver - FFB 116 SILVER IT", image: "https://www.onebby.it/87556-home_default/whirlpool-whirlpool-ffb116silverit-lavatrice-11-kg-centrifuga-1400-giri-classe-a-colore-silver-ffb-116-silver-it.jpg", price: 443.58},
    {id: 3, name: "Whirlpool FFB116SILVERIT Lavatrice 11 KG Centrifuga 1400 Giri Classe A colore Silver - FFB 116 SILVER IT", image: "https://www.onebby.it/87556-home_default/whirlpool-whirlpool-ffb116silverit-lavatrice-11-kg-centrifuga-1400-giri-classe-a-colore-silver-ffb-116-silver-it.jpg", price: 443.58},
    {id: 4, name: "Whirlpool FFB116SILVERIT Lavatrice 11 KG Centrifuga 1400 Giri Classe A colore Silver - FFB 116 SILVER IT", image: "https://www.onebby.it/87556-home_default/whirlpool-whirlpool-ffb116silverit-lavatrice-11-kg-centrifuga-1400-giri-classe-a-colore-silver-ffb-116-silver-it.jpg", price: 443.58},
    {id: 5, name: "Whirlpool FFB116SILVERIT Lavatrice 11 KG Centrifuga 1400 Giri Classe A colore Silver - FFB 116 SILVER IT", image: "https://www.onebby.it/87556-home_default/whirlpool-whirlpool-ffb116silverit-lavatrice-11-kg-centrifuga-1400-giri-classe-a-colore-silver-ffb-116-silver-it.jpg", price: 443.58},
    {id: 6, name: "Whirlpool FFB116SILVERIT Lavatrice 11 KG Centrifuga 1400 Giri Classe A colore Silver - FFB 116 SILVER IT", image: "https://www.onebby.it/87556-home_default/whirlpool-whirlpool-ffb116silverit-lavatrice-11-kg-centrifuga-1400-giri-classe-a-colore-silver-ffb-116-silver-it.jpg", price: 443.58},
]

const CategoryLayoutScreen = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const goBack = useCallback(() => {
      router.back();
    }, [router]);

  return (
    <ThemedView style={styles.root}>
      <ThemedView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <TouchableOpacity onPress={goBack}>
          <IconSymbol name='back-arrow' size={30} color={useColorScheme() === 'light' ? Colors.dark.background : Colors.light.background} />
        </TouchableOpacity>
        <ThemedText numberOfLines={1} ellipsizeMode='tail' style={{fontWeight: '900', fontSize: 26, marginTop: 10, padding: 0, verticalAlign: 'middle', textAlignVertical: 'center', paddingVertical: 10 }}>Washing Machines</ThemedText>
      </ThemedView>
      <ThemedView style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{borderWidth: 1, borderColor: useColorScheme() === 'light' ? Colors.dark.background : Colors.light.background, width: 30, borderRadius: 10 }}>
          <IconSymbol name='filter-list' size={30} color={useColorScheme() === 'light' ? Colors.dark.background : Colors.light.background} />
        </TouchableOpacity>
        <ThemedText>  Filter</ThemedText>
      </ThemedView>
      <ThemedView style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, _) => item.id.toString()}
          renderItem={({item}) => <ProductItem item={item} style={{marginBottom: 20, width: width/2}} />} 
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