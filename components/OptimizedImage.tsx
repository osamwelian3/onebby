import React, { useState, useEffect, memo } from "react";
import { Image, Dimensions, View, ActivityIndicator, Alert, StyleProp, ViewProps, ImageProps } from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";

const { width } = Dimensions.get("window");

const cacheImage = async (base64Image: string, cacheFileUri: string) => {
  try {
    const base64Data = base64Image.split(",")[1];
    await FileSystem.writeAsStringAsync(cacheFileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return cacheFileUri; // Return saved file path
  } catch (error) {
    console.error("Error caching image:", error);
    return null; // Return null if caching fails
  }
};

async function findImageInCache(uri: string) {
  try {
    let info = await FileSystem.getInfoAsync(uri);
    return { ...info, err: false };
  } catch (error) {
    console.log('Find in cache error: ', error)
    return {
      exists: false,
      err: true,
      msg: error,
    };
  }
}

const OptimizedImage = memo(({ productId, imageId, style }: { productId: Number, imageId: Number, style?: StyleProp<ImageProps> }) => {
  const [imgUri, setUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  const username = "7S6NTR3BIEQ57EZYKSDV2UMHZZNGS38S"
  const password = "" // If password is empty, ensure API allows it
  const credentials = btoa(`${username}:${password}`) // Fix Base64 encoding

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async (cacheFileUri: string) => {
      try {
        const response = await axios.get(
          `https://www.onebby.it/api/images/products/${productId}/${imageId}`,
          {
            headers: { Authorization: `Basic ${credentials}` },
            responseType: 'blob',
          }
        );

        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = async () => {
          if (isMounted) {
            // setUri(reader.result as string);

            let cached = await cacheImage(reader.result as string, cacheFileUri);
            if (cached === cacheFileUri) {
              console.log("cached NEw!");
              setUri(cached);
            } else {
              Alert.alert(`Couldn't load Image!`);
            }

            setLoading(false);
          }
        };
      } catch (error) {
        // console.error("Image Fetch Error:", error);
        return await fetchImage(cacheFileUri)
      }
    };

    const loadImg = async () => {
      let imgXt = 'jpeg';
      const cacheFileUri = `${FileSystem.cacheDirectory}${productId}${imageId}.${imgXt}`;
      let imgXistsInCache = await findImageInCache(cacheFileUri);
      if (imgXistsInCache.exists) {
        console.log("cached! ", cacheFileUri);
        setUri(cacheFileUri);
        setLoading(false)
      } else {
        await fetchImage(cacheFileUri)
      }
    }
    loadImg()
    // fetchImage();

    return () => {
      isMounted = false;
    };
  }, [productId, imageId]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="small" color="#641691" />
      ) : (
        imgUri ? (
          <Image
            source={{ uri: imgUri, cache: 'force-cache' }}
            resizeMode='contain'
            style={style ? style : { width: width / 3, height: width / 3, borderRadius: 10 }}
          />
        ) : null
      )}
    </View>
  );
});

export default memo(OptimizedImage);
