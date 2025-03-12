import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { MaterialTopTabs } from '../../_layout'

const Layout = () => {
  return (
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <MaterialTopTabs>
        <MaterialTopTabs.Screen name='index' options={{title: 'Basic Info', animationEnabled: false}} />
        <MaterialTopTabs.Screen name='password' options={{title: 'Update Password', animationEnabled: false}} />
      </MaterialTopTabs>
    </View>
  )
}

export default Layout