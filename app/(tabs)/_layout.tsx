import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";



export default function TabsLayout() {
  return (
     <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#007AFF", // Blue for active icons/text
        tabBarInactiveTintColor: "#A0A0A0", // Gray for inactive
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: "#fff",
          borderTopWidth: 0, // 👈 Thin line on top
          borderTopColor: "#dcdcdc", // 👈 Soft gray top border
          elevation: 0, // Remove Android shadow
          shadowOpacity: 0, // Remove iOS shadow
        },
      }}
    >
      <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-today" size={size} color={color} />
            ),
          }}

      />

      <Tabs.Screen
          name="streaks"
          options={{
            title: "Streaks",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-line" size={size} color={color} />
            ),
          }}
      />
      <Tabs.Screen
          name="add-habit"
          options={{
            title: "Add Habit",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 24, 
              fontWeight: "bold", 
              marginTop: 20, 
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
            ),
          }}
      />

    </Tabs>
  );
}