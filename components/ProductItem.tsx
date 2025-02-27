import { StyleSheet, TouchableOpacity, Image, Dimensions, ViewProps } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { ThemedView } from './ThemedView'
import { useRouter } from 'expo-router'
import { IconSymbol } from './ui/IconSymbol'
import { ThemedText } from './ThemedText'
import { Colors } from '@/constants/Colors'
import { Product } from '@/store/product/product'
import axios from 'axios'
import OptimizedImage from './OptimizedImage'

const { width } = Dimensions.get('window')

export type ProductItemProps = ViewProps & {
  item: Product
}

const ProductItem = ({ style, item }: ProductItemProps) => {
  const router = useRouter()

  return (
    <ThemedView
      lightColor="#fff"
      darkColor={Colors.light.tint}
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: 'center',
          marginHorizontal: 10,
          borderRadius: 10,
          padding: 10
        },
        style
      ]}
    >
      <TouchableOpacity activeOpacity={0.8} style={{ position: 'relative', alignItems: 'center' }} onPress={() => router.push(`/(drawer)/product/${item.id}`)}>
        
        <OptimizedImage productId={item.id} imageId={item.id_default_image} />

        <ThemedView style={{ position: 'absolute', right: 10, top: 10, borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: "#641691" }}>
          <IconSymbol name="favorite-border" size={20} />
        </ThemedView>

        <ThemedText numberOfLines={3} style={{ textAlign: 'center', marginBottom: 10 }}>
          {item.name}
        </ThemedText>
        <ThemedText style={{ textAlign: 'center', fontWeight: '900' }}>
          {Number(item.price).toFixed(2)} <ThemedText ignore={true}>€</ThemedText>
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  )
}

export default memo(ProductItem)

const styles = StyleSheet.create({})



// import { StyleSheet, TouchableOpacity, Image, Dimensions, ViewProps } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { ThemedView } from './ThemedView'
// import { useRouter } from 'expo-router'
// import { IconSymbol } from './ui/IconSymbol'
// import { ThemedText } from './ThemedText'
// import { Colors } from '@/constants/Colors'
// import { Product } from '@/store/product/product'
// import axios from 'axios'

// const {width, height} = Dimensions.get('window')

// export type ProductItemProps = ViewProps & {
//     item: Product
// }

// const ProductItem = ({style, item}: ProductItemProps) => {
//   const router = useRouter();  
//   const [imgUri, setUri] = useState<string>()
//   const username = "7S6NTR3BIEQ57EZYKSDV2UMHZZNGS38S";
//   const password = "";
//   const credentials = btoa(`${username}:${password}`); // Encode to Base64

//   useEffect(() => {
//     let config = {
//       method: 'get',
//       maxBodyLength: Infinity,
//       url: `https://7S6NTR3BIEQ57EZYKSDV2UMHZZNGS38S:@www.onebby.it/api/images/products/${item.id}/${item.id_default_image}`,
//       headers: {
//         'Authorization': `Basic ${credentials}`
//       }
//     };
  
//     axios.request(config)
//     .then((response) => {
//       const blob = response.data;
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUri(reader.result as string);
//         console.log(reader.result as string)
//       }
//       reader.readAsDataURL(blob);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   }, [])

//   // console.log(`https://7S6NTR3BIEQ57EZYKSDV2UMHZZNGS38S:@www.onebby.it/api/images/products/${item.id}/${item.id_default_image}`)
//   return (
//     <ThemedView
//         lightColor="#fff"
//         darkColor={Colors.light.tint}
//         style={[{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: 'center',
//             marginHorizontal: 10,
//             borderRadius: 10,
//             padding: 10
//         }, style]}
//         >
//         <TouchableOpacity activeOpacity={0.8} style={{position: 'relative', alignItems: 'center'}}>
//             {imgUri && <Image source={{ uri: imgUri, headers: { 'Authorization': `Basic ${credentials}` } }} resizeMode='contain' style={{width: width/3, height: width/3, borderRadius: 10}} onError={(error) => console.log("Product Image Error: ", error)} />}
//             <ThemedView style={{position: 'absolute', right: 10, top: 10, borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: "#641691"}}>
//               <IconSymbol name="favorite-border" size={20} />
//             </ThemedView>
//             <ThemedText numberOfLines={3} style={{textAlign: 'center', marginBottom: 10}}>{item.name}</ThemedText>
//             <ThemedText style={{textAlign: 'center', fontWeight: '900'}}>{Number(item.price).toFixed(2)} <ThemedText>€</ThemedText></ThemedText>
//         </TouchableOpacity>
//     </ThemedView>
//   )
// }

// export default ProductItem

// const styles = StyleSheet.create({})