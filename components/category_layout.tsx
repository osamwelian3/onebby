import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import ProductsCarousel from './products_carousel';
import { Product } from '@/constants/types';

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

const CategoryLayout = () => {
  return (
    <ThemedView>
        <ThemedView style={{margin: 20}}>
            <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
                <ThemedText allowFontScaling style={{fontWeight: 'bold', fontSize: 26}}>Lavatrici</ThemedText>
                <ThemedView style={{height: 2, width: width/3, margin: 10, backgroundColor: '#641691' }}></ThemedView>
            </ThemedView>
            <ThemedText style={{color: "#641691"}}>
                Le lavatrici offrono pulizia impeccabile, efficienza energetica e programmi personalizzati, ideali per prendersi cura di ogni tipo di tessuto.
            </ThemedText>
        </ThemedView>
        <ProductsCarousel products={products} />
    </ThemedView>
  )
}

export default CategoryLayout

const styles = StyleSheet.create({})