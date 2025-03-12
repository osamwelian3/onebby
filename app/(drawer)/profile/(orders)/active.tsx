import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

const ActiveOrders = () => {
  return (
    <ThemedView style={styles.root}>
        <ThemedText>No Active Orders</ThemedText>
    </ThemedView>
  )
}

export default ActiveOrders

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    }
})