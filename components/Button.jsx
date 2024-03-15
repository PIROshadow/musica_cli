import React from "react";
import { ActivityIndicator, Pressable, Text, View, Touchable, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';

export default function Button ({
    onPress,
    classBtn,
    icon = false,
    loading = false,
    title = false,
    isLogin = false,
    haptic = "notificationWarning",
    disable = false,
    short = false
  }) {
    const [fontsLoaded] = useFonts({
      'Inter-Black': require("../assets/fonts/Inter-Black.ttf"),
      'Inter-Bold': require("../assets/fonts/Inter-Bold.ttf"),
      'Inter-ExtraBold': require("../assets/fonts/Inter-ExtraBold.ttf"),
      'Inter-ExtraLight': require("../assets/fonts/Inter-ExtraLight.ttf"),
      'Inter-Light': require("../assets/fonts/Inter-Light.ttf"),
      'Inter-Medium': require("../assets/fonts/Inter-Medium.ttf"),
      'Inter-Regular': require("../assets/fonts/Inter-Regular.ttf"),
      'Inter-SemiBold': require("../assets/fonts/Inter-SemiBold.ttf"),
      'Inter-Thin': require("../assets/fonts/Inter-Thin.ttf"),
    });

    return (
        <View className={`${short ? 'flex-1' : 'w-full'}`}>
          <TouchableOpacity
            className={`flex-row justify-center h-12 items-center rounded-full bg-purple-700  ${classBtn}`}
            onPress={() => {
              onPress();
            }}
            disabled={disable}
          >
            {loading ? (
              <View className="scale-110">
                <ActivityIndicator size={24} color="white" />
              </View>
            ) : isLogin ? (
              <Text
                style={{ fontFamily: "Inter-SemiBold" }}
                className="text-base text-center text-white"
              >
                Get Started
              </Text>
            ) : (
              <>
                {icon && icon}
                {title && (
                  <Text
                    style={{ fontFamily: "Inter-SemiBold" }}
                    className="text-center text-white ml-2 text-lg pb-1"
                  >
                    {title}
                  </Text>
                )}
              </>
            )}
          </TouchableOpacity>
        </View>
      );
}
