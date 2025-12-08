import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: Platform.OS === "ios" ? 24 : 12,
          height: 72,
          borderRadius: 36,
          backgroundColor: "#F5F6F6",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: 8 },
          shadowRadius: 16,
          elevation: 16,
          paddingTop: 14,             
          paddingBottom: 0,          
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarIconStyle: {
          alignSelf: "center",    
        },
        tabBarActiveTintColor: "#476250",
        tabBarInactiveTintColor: "#888",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-variant"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: "Checklist",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-list"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pesquisa"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="magnify"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}