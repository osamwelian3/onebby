import { Image, StyleSheet, Platform, ScrollView, TextInput, Dimensions, StatusBar, TouchableOpacity, View, useColorScheme } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { IconSymbol } from '@/components/ui/IconSymbol';
import CarouselView from '@/components/carousel';
import CategoryLayout from '../../../../components/category_layout';
import { useNavigation } from 'expo-router';
import { useRouteInfo } from 'expo-router/build/hooks';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect } from 'react';
import { fetchCategory } from '@/store/category/category';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/store';
import { FlatList } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category)

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  const navigation = useNavigation();
  console.log(useRouteInfo())
  console.log(navigation.getId())
  return (
    <ThemedView style={styles.root}>
      <ThemedView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: width-20, position: 'sticky'}}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.openDrawer()}>
          <ThemedView style={{padding: 10}}>
            {/* <IconSymbol name='back-arrow' size={30} /> */}
            <Image source={require('@/assets/images/onebby_logo.jpg')} style={{width: 40, height: 40}} />
          </ThemedView>
        </TouchableOpacity>
        <ThemedTextInput 
          placeholder="Cerca..."
          type="outlined"
          leftIcon={<IconSymbol name='search' size={20} color={useColorScheme() === 'light' ? Colors.dark.background : Colors.light.background} />}
          style={{ marginTop: 5, width: width/1.5  }}
        />
        <TouchableOpacity>
          <ThemedView style={{padding: 10}}>
            <IconSymbol name='cart' size={30} color={useColorScheme() === 'light' ? Colors.dark.background : Colors.light.background} />
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>
      <ScrollView style={{flex: 1}} nestedScrollEnabled={true}>
        <CarouselView />
        <FlatList />
        <CategoryLayout />
        <CategoryLayout />
        <View style={{height: 5}}></View>
      </ScrollView>
    </ThemedView>
  )
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
