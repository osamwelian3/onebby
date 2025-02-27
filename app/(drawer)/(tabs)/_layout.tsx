import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { useAppSelector } from '@/store';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const translate = useAppSelector((state) => state.category.translate)

  return (
    <View style={{flex: 1}}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="(catalog)"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="house.fill" color={focused ? colorScheme === 'dark' ? 'white' : '#641691' : color} />,
            tabBarActiveTintColor: '#641691',
            tabBarLabel: ({focused, color}) => <ThemedText ignore={true} style={{color: focused ? color : color, fontSize: 12, lineHeight: 13}}>{translate ? 'Home' : 'Casa'}</ThemedText>
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="paperplane.fill" color={focused ? colorScheme === 'dark' ? 'white' : '#641691' : color} />,
            tabBarActiveTintColor: '#641691',
            tabBarLabel: ({focused, color}) => <ThemedText ignore={true} style={{color: focused ? color : color, fontSize: 12, lineHeight: 13}}>{translate ? 'Explore' : 'Esplorare'}</ThemedText>
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="person" color={focused ? colorScheme === 'dark' ? 'white' : '#641691' : color} />,
            tabBarActiveTintColor: '#641691',
            tabBarLabel: ({focused, color}) => <ThemedText ignore={true} style={{color: focused ? color : color, fontSize: 12, lineHeight: 13}}>{translate ? 'Profile' : 'Profilo'}</ThemedText>
          }}
        />
      </Tabs>

    </View>
  );
}
