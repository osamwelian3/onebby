import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCategory, setTranslate } from "@/store/category/category";
import { fetchProduct } from "@/store/product/product";
import translateText from "@/utils/translate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import { Switch, TouchableOpacity } from "react-native";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false)
  const dispatch = useAppDispatch()
  const translate = useAppSelector((state) => state.category.translate)

  useEffect(() => {
    AsyncStorage.getItem('language')
    .then(async (value) => {
      if (!value) {
        await AsyncStorage.setItem('language', 'IT')
      } else {
        if (value === 'IT') {
          setIsEnglish(false)
        }
        if (value === 'EN') {
          setIsEnglish(true)
        }
      }
    })
  }, [isEnglish, translate])

  const toggleLanguage = async () => {
    if (isEnglish) {
      AsyncStorage.setItem('language', 'IT')
      .then(() => {
        setIsEnglish(false)
        dispatch(setTranslate(false))
      })
    } else {
      AsyncStorage.setItem('language', 'EN')
      .then(() => {
        setIsEnglish(true)
        dispatch(setTranslate(true))
      })
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      {/* Normal Drawer Screens */}
      <DrawerItem
        label={({focused, color}) => <ThemedText ignore={true} style={{color: focused ? 'black' : color}}>{translate ? 'Home' : 'Casa'}</ThemedText>}
        onPress={() => router.navigate("/(drawer)/(tabs)/(catalog)")}
      />

      {/* Nested Tabs Section */}
      <ThemedText style={{ marginLeft: 16, marginTop: 16, fontWeight: "bold" }} ignore={true}>
        Tabs
      </ThemedText>
      <DrawerItem
        label={({focused, color}) => <ThemedText ignore={true} style={{color: focused ? 'black' : color}}>{translate ? 'Home' : 'Casa'}</ThemedText>}
        onPress={() => router.navigate("/(drawer)/(tabs)/(catalog)")}
      />
      <DrawerItem
        label={({focused, color}) => <ThemedText ignore={true} style={{color: focused ? 'black' : color}}>{translate ? 'Explore' : 'Esplorare'}</ThemedText>}
        onPress={() => router.push("/(drawer)/(tabs)/explore")}
      />
      <DrawerItem
        label={({focused, color}) => <ThemedText ignore={true} style={{color: focused ? 'black' : color}}>{translate ? 'Profile' : 'Profilo'}</ThemedText>}
        onPress={() => router.push("/(drawer)/(tabs)/profile")}
      />
      <ThemedView style={{padding: 20, flexDirection: 'row'}}>
        <ThemedText ignore={true}>{translate ? 'Select Language:' : 'Selezionare la lingua:'}   </ThemedText>
        <TouchableOpacity onPress={() => toggleLanguage()}>
          <ThemedText ignore={true} style={{color: translate ? 'blue' : 'black'}}>IT</ThemedText>
        </TouchableOpacity>
        <ThemedText>   |   </ThemedText>
        <TouchableOpacity onPress={() => toggleLanguage()}>
          <ThemedText ignore={true} style={{color: translate ? 'black' : 'blue'}}>EN</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </DrawerContentScrollView>
  );
}
    
export default function DrawerLayout() {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
      dispatch(fetchCategory())
      dispatch(fetchProduct())
    }, [])

    return (
        <Drawer
         drawerContent={(props) => <CustomDrawerContent {...props} />}
         screenOptions={{headerShown: false}}>
            <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home", title: "Home", headerShown: false }} />
            <Drawer.Screen name="product/[id]" options={{headerShown: false, }} />
        </Drawer>
    );
}