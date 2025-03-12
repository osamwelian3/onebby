import { StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { useRouter } from 'expo-router'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ThemedText'
import { MaterialTopTabs } from '../../_layout'

const Layout = () => {
    const router = useRouter()
    const colorScheme = useColorScheme()
    const [orders, setOrders] = useState([])

  return (
    <ThemedView style={styles.root}>
        <ThemedView style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between', width: '70%', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => router.back()}>
                <IconSymbol name='back-arrow' color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} size={20} />
            </TouchableOpacity>
            <ThemedView style={{alignItems: 'center'}}>
                <ThemedText>My Orders</ThemedText>
                <ThemedText style={{fontSize: 10, fontStyle: 'italic'}}>Track all your active orders</ThemedText>
            </ThemedView>
        </ThemedView>
        <View style={{backgroundColor: '#fff', height: 1}}></View>
        <View style={{flex: 1}}>
            <MaterialTopTabs
            initialRouteName='complete'>
                <MaterialTopTabs.Screen name='complete' options={{title: 'Complete Orders'}} />
                <MaterialTopTabs.Screen name='active' options={{title: 'Active Orders'}} />
            </MaterialTopTabs>
        </View>
    </ThemedView>
  )
}

export default Layout

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    }
})