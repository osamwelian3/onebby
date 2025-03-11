import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetState } from "@/store/cart/cart";
import { Category, fetchCategory, setTranslate } from "@/store/category/category";
import { fetchProduct } from "@/store/product/product";
import { GroupedProducts } from "@/utils/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContent, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity, View, Image, StatusBar, useColorScheme, Appearance } from "react-native";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const dispatch = useAppDispatch()
  const translate = useAppSelector((state) => state.category.translate)
  const categories = useAppSelector((state) => state.product.groupedProducts)
  const colorScheme = useColorScheme()

  const data = useMemo(() => categories, [categories])

  const renderCategories = useCallback(({item}: {item: GroupedProducts}) => (
    <DrawerItem
      label={({focused, color}) => <ThemedText numberOfLines={1} style={{color: focused ? 'black' : color, alignItems: 'center'}}>- {item.category.name}</ThemedText>}
      onPress={() => {
        toggleCategoriesView();
        router.navigate(`/(drawer)/(tabs)/(catalog)/category/${item.category.id}`);
      }}
    />
  ), [categories])

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

  const toggleTheme = () => {
    if (colorScheme === 'dark') {
      Appearance.setColorScheme('light')
    } else {
      Appearance.setColorScheme('dark')
    }
  }

  const toggleCategoriesView = () => {
    setShowCategories(!showCategories)
    console.log(categories.find((cat) => cat.category.id === 90)?.category.name)
  }

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
    <ThemedView lightColor="transparent" style={{flex: 1, marginTop: StatusBar.currentHeight}}>
      <ThemedView lightColor="#fff" style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('@/assets/images/onebby_logo.jpg')} style={{width: 90, height: 90}} />
        <ThemedText>ONEBBY MARKETPLACE</ThemedText>
      </ThemedView>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label={({focused, color}) => <ThemedText ignore={true} style={{color: focused ? 'black' : color}}>{translate ? 'Home' : 'Casa'}</ThemedText>}
          onPress={() => router.navigate("/(drawer)/(tabs)/(catalog)")}
        />
        <DrawerItem
          label={({focused, color}) => <ThemedText ignore={true} style={{color: focused ? 'black' : color}}>{translate ? 'Cart' : 'Cart'}</ThemedText>}
          onPress={() => router.push("/(drawer)/(tabs)/cart")}
        />
        <DrawerItem
          label={({focused, color}) => <ThemedText ignore={true} style={{color: focused ? 'black' : color}}>{translate ? 'Profile' : 'Profilo'}</ThemedText>}
          onPress={() => router.push("/(drawer)/(tabs)/profile")}
        />
        <DrawerItem
          label={({focused, color}) => <ThemedText ignore={true} style={{color: focused ? 'black' : color, alignItems: 'center'}}>{translate ? 'Category' : 'Category'} <IconSymbol name="arrow-drop-down" color={focused ? 'black' : color} size={40} /></ThemedText>}
          onPress={() => toggleCategoriesView()}
        />
        <ThemedView lightColor="transparent" style={{marginLeft: 20, height: showCategories ? '100%' : 0, borderLeftWidth: 1}}>
          <FlashList 
           data={data}
           keyExtractor={(item) => item.category.id.toString()}
           renderItem={renderCategories}/>
        </ThemedView>
      </DrawerContentScrollView>
      <ThemedView style={{padding: 20, flexDirection: 'row', borderBottomWidth: 1}}>
        <ThemedText ignore={true}>{translate ? 'Dark Mode:' : 'Dark Mode:'}   </ThemedText>
        <ThemedView style={{flexDirection: 'row'}}>
          <TouchableOpacity activeOpacity={1} style={{padding: 0, backgroundColor: '#fff', width: 30, borderStartStartRadius: 35, borderStartEndRadius: 35}} onPress={() => toggleTheme()}>
            <ThemedView style={{height: 30, width: 30, borderRadius: 35, backgroundColor: 'gray', display: colorScheme === 'dark' ? 'none' : 'flex'}}>
            </ThemedView>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={{padding: 0, backgroundColor: '#fff', width: 30, borderEndStartRadius: 35, borderEndEndRadius: 35}} onPress={() => toggleTheme()}>
            <ThemedView style={{height: 30, width: 30, borderRadius: 35, backgroundColor: Colors.light.textInputBorder, display: colorScheme === 'light' ? 'none' : 'flex'}}>
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      <ThemedView style={{padding: 20, flexDirection: 'row', borderBottomRightRadius: 15}}>
        <ThemedText ignore={true}>{translate ? 'Select Language:' : 'Selezionare la lingua:'}   </ThemedText>
        <TouchableOpacity onPress={() => toggleLanguage()}>
          <ThemedText ignore={true} style={{color: translate ? 'blue' : 'black'}}>IT</ThemedText>
        </TouchableOpacity>
        <ThemedText>   |   </ThemedText>
        <TouchableOpacity onPress={() => toggleLanguage()}>
          <ThemedText ignore={true} style={{color: translate ? 'black' : 'blue'}}>EN</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}
    
export default function DrawerLayout() {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
      dispatch(fetchCategory())
      dispatch(fetchProduct())
      // dispatch(resetState())
    }, [])

    return (
        <Drawer
         drawerContent={(props) => <CustomDrawerContent {...props} />}
         screenOptions={{headerShown: false}}>
            <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home", title: "Home", headerShown: false }} />
            <Drawer.Screen name="product/[id]" options={{headerShown: false, }} />
            <Drawer.Screen name="search/search" options={{headerShown: false, }} />
            <Drawer.Screen name="profile/settings" options={{headerShown: false, }} />
        </Drawer>
    );
}