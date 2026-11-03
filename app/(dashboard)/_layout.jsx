import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

import UserOnly from '../../components/auth/UserOnly'

export default function DashboardLayout() {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

    return (
        <UserOnly>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: theme.navBackground, paddingTop: 10, height: 90 },
                    tabBarActiveTintColor: theme.iconColorFocused,
                    tabBarInactiveTintColor: theme.iconColor
                }}
            >
                <Tabs.Screen
                    name="profile"
                    options={{ title: "Profile", tabBarIcon: ({ focused }) => (
                        <Ionicons 
                            size={24}
                            name={focused ? 'person' : 'person-outline'}
                            color={focused ? theme.iconColorFocused : theme.iconColor}
                        />
                    )}}
                />
                <Tabs.Screen
                    name="books"
                    options={{ title: "Books", tabBarIcon: ({ focused }) => (
                        <Ionicons 
                            size={24}
                            name={focused ? 'book' : 'book-outline'}
                            color={focused ? theme.iconColorFocused : theme.iconColor}
                        />
                    )}}
                />
                <Tabs.Screen
                    name="create"
                    options={{ title: "Create", tabBarIcon: ({ focused }) => (
                        <Ionicons 
                            size={24}
                            name={focused ? 'create' : 'create-outline'}
                            color={focused ? theme.iconColorFocused : theme.iconColor}
                        />
                    )}}
                />
                <Tabs.Screen 
                    name="bookItem/[id]"
                    options={{
                        // href: null   // In Expo Router (SDK 58 / Expo 52+), setting href: null on a <Tabs.Screen> marks the route as hidden: true. When you navigate to that route, Expo Router's tab navigator (useVisibleTabsWithRedirect) treats it as unreachable and immediately redirects (router.replace) back to the initial tab (profile or books). The screen either immediately bounced back or never remained focused to render.
                        tabBarItemStyle: { display: 'none' }
                    }}
                />
            </Tabs>
        </UserOnly>
    )
}