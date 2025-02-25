import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const CatalogRouter = () => {
  return (
    <Stack
        screenOptions={{
            headerShown: false
        }}
    >
       <Stack.Screen name='index' options={{headerShown: false}} /> 
       {/* <Stack.Screen name='category' options={{headerShown: false}} /> */}
    </Stack>
  )
}

export default CatalogRouter

const styles = StyleSheet.create({})