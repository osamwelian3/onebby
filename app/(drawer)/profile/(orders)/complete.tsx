import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

const CompleteOrders = () => {
  return (
    <ThemedView style={styles.root}>
        <ThemedText>No Complete Orders</ThemedText>
    </ThemedView>
  )
}

export default CompleteOrders

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    }
})