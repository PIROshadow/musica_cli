import { ClerkProvider } from "@clerk/clerk-expo";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import HistoryScreen from './screens/History';
import HomeScreen from './screens/Home';
import LogInScreen from './screens/LogIn';
import ResultScreen from './screens/Result';
import SettingsScreen from './screens/Setting';
import SignUpScreen from "./screens/SignUp";
// import {trigger} from 'react-native-haptic-feedback';
import Constants from "expo-constants";
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import NetworkError from './components/NetworkError';

const width = Dimensions.get('window').width;

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require("./assets/fonts/Inter-Black.ttf"),
    'Inter-Bold': require("./assets/fonts/Inter-Bold.ttf"),
    'Inter-ExtraBold': require("./assets/fonts/Inter-ExtraBold.ttf"),
    'Inter-ExtraLight': require("./assets/fonts/Inter-ExtraLight.ttf"),
    'Inter-Light': require("./assets/fonts/Inter-Light.ttf"),
    'Inter-Medium': require("./assets/fonts/Inter-Medium.ttf"),
    'Inter-Regular': require("./assets/fonts/Inter-Regular.ttf"),
    'Inter-SemiBold': require("./assets/fonts/Inter-SemiBold.ttf"),
    'Inter-Thin': require("./assets/fonts/Inter-Thin.ttf"),
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Feather name="home" size={size} color={color} />;
          } else if (route.name === 'History') {
            return <Feather name="grid" size={size} color={color} />;
          } else if (route.name === 'Setting') {
            return <Feather name="settings" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'rgb(126 34 206)',
        tabBarInactiveTintColor: '#282828',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          position: 'absolute',
          bottom: 12,
          borderRadius: 15,
          paddingHorizontal: 10,
          marginHorizontal: 16,
          shadowColor: '#888',
          shadowOffset: { width: 0, height: 0 },
          elevation: 4,
          zIndex: 10,
        },
        tabBarItemStyle: {
          flex: 1,
          paddingVertical: 8,
          fontFamily: 'Inter-Regular',
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          paddingTop: width < 580 ? 0 : 4,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
        listeners={() => ({
          tabPress: () => {
            // trigger('soft', options);
          },
        })}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
        }}
        listeners={() => ({
          tabPress: () => {
            // trigger('soft', options);
          },
        })}
      />
      <Tab.Screen
        name="Setting"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
        listeners={() => ({
          tabPress: () => {
            // trigger('soft', options);
          },
        })}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  NavigationBar.setBackgroundColorAsync("white");

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
    >
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeStack"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <NetworkError />
      </NavigationContainer>
    </ClerkProvider>
  );
};

export default App;