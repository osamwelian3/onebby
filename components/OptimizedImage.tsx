import React, { useState, useEffect, memo } from "react";
import { Image, Dimensions, View, ActivityIndicator } from "react-native";
import axios from "axios";

const { width } = Dimensions.get("window");

const OptimizedImage = memo(({ productId, imageId, credentials }: { productId: Number, imageId: Number, credentials: string }) => {
  const [imgUri, setUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://www.onebby.it/api/images/products/${productId}/${imageId}`,
          {
            headers: { Authorization: `Basic ${credentials}` },
            responseType: "blob",
          }
        );

        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = () => {
          if (isMounted) {
            setUri(reader.result as string);
            setLoading(false);
          }
        };
      } catch (error) {
        console.error("Image Fetch Error:", error);
        setLoading(false);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [productId, imageId]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="small" color="#641691" />
      ) : (
        imgUri && (
          <Image
            source={{ uri: imgUri, cache: 'force-cache' }}
            resizeMode="contain"
            style={{ width: width / 3, height: width / 3, borderRadius: 10 }}
          />
        )
      )}
    </View>
  );
});

export default memo(OptimizedImage);
