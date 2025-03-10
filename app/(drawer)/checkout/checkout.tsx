import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

const Checkout = () => {
  return (
    <ThemedView style={styles.root}>
        <ThemedText>Checkout</ThemedText>
    </ThemedView>
  )
}

export default Checkout

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    }
})