import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { HomeScreen } from "../screens"
import { CarScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import {
  Icon
} from 'react-native-magnus';
import px2dp from "../utils/px2dp"
export type TabTabParamList = {
  商品列表: undefined
  购物车: undefined
}

export type DemoTabScreenProps<T extends keyof TabTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabTabParamList>()

export function TabNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="商品列表"
        component={HomeScreen}
        options={{
          tabBarLabel: '商品列表',
          tabBarIcon: ({ focused }) => <Icon name="home" color={focused && colors.tint} fontSize={px2dp(35)} />,
        }}
      />

      <Tab.Screen
        name="购物车"
        component={CarScreen}
        options={{
          tabBarLabel: '购物车',
          tabBarIcon: ({ focused }) => <Icon name="shoppingcart"  color={focused && colors.tint}  fontSize={px2dp(35)} />,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
