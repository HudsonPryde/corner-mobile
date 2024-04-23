import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { View, Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -5 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: '#9be8ac',
        tabBarLabel(props) {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 5,
                width: 5,
                borderRadius: 100,
                backgroundColor: props.focused ? '#6c6d6c' : 'transparent',
                marginBottom: 10,
              }}
            />
          );
        },
        tabBarItemStyle: {
          marginHorizontal: 25,
          borderRadius: 10,
        },
        tabBarStyle: {
          height: 90,
          borderTopWidth: 0,
          backgroundColor: Colors['light'].background,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="planet-outline" color={'#6c6d6c'} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="compass-outline" color={'#6c6d6c'} />
          ),
        }}
      />
      <Tabs.Screen
        name="programs"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pricetags-outline" color={'#6c6d6c'} />
          ),
        }}
      />

      <Tabs.Screen
        name="cards"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="card-outline" color={'#6c6d6c'} />
          ),
        }}
      />
    </Tabs>
  );
}
