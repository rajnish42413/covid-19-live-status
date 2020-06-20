import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import TabBarIcon from "../components/TabBarIcon";
import Home from "../screens/Home";
import {createStackNavigator } from "@react-navigation/stack";
import NewsDetail from "../screens/NewsDetail";
import History from "../screens/History";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";
const Stack = createStackNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" />
          )
        }}
      />
      <BottomTab.Screen
        name="History"
        component={History}
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="unordered-list" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}



export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={BottomTabNavigator} options={{ title:"SEARCH MOVIE BY NAME"}} />
      <Stack.Screen name="History" component={NewsDetail}  options={{ title:"SAVED MOVIE LIST"}}  />
    </Stack.Navigator>
  );
};
