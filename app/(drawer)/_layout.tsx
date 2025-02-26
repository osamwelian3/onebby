import { ThemedText } from "@/components/ThemedText";
import { useAppDispatch } from "@/store";
import { fetchCategory } from "@/store/category/category";
import { fetchProduct } from "@/store/product/product";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchProduct())
  }, [])

  return (
    <DrawerContentScrollView {...props}>
      {/* Normal Drawer Screens */}
      <DrawerItem
        label="Home"
        onPress={() => router.navigate("/(drawer)/(tabs)/(catalog)")}
      />

      {/* Nested Tabs Section */}
      <ThemedText style={{ marginLeft: 16, marginTop: 16, fontWeight: "bold" }}>
        Tabs
      </ThemedText>
      <DrawerItem
        label="Home"
        onPress={() => router.navigate("/(drawer)/(tabs)/(catalog)")}
      />
      <DrawerItem
        label="Explore"
        onPress={() => router.push("/(drawer)/(tabs)/explore")}
      />
      <DrawerItem
        label="Profile"
        onPress={() => router.push("/(drawer)/(tabs)/profile")}
      />
    </DrawerContentScrollView>
  );
}
    
export default function DrawerLayout() {
    const router = useRouter();

    return (
        <Drawer
         drawerContent={(props) => <CustomDrawerContent {...props} />}
         screenOptions={{headerShown: false}}>
            <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home", title: "Home", headerShown: false }} />
            {/* <Drawer.Screen name="explore" options={{ drawerLabel: "Explore", title: "Explore", headerShown: false }} listeners={{focus: () => router.push("/(tabs)/explore")}} /> */}
        </Drawer>
    );
}