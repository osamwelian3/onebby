import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import ParallaxScrollView from '@/components/ParallaxScrollView'

const Profile = () => {
  return (
    <ThemedView style={styles.container}>
        <ThemedText>My Profile</ThemedText>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1
    }
})