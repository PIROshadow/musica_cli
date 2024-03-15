import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import { useFonts } from 'expo-font';
// import {trigger} from 'react-native-haptic-feedback';

// const options = {
//   enableVibrateFallback: true,
//   ignoreAndroidSystemSettings: false,
// };

const Navbar = ({title, back = false}) => {
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

  const navigation = useNavigation();

  return (
    <View className="p-3 flex flex-row items-center">
      {back && (
        <TouchableOpacity
          className="pr-1"
          onPress={() => {
            // trigger('impactLight', options);
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
      )}
      <Text
        style={{fontFamily: 'Inter-SemiBold'}}
        className="text-xl text-black pl-1">
        {title}
      </Text>
    </View>
  );
};

export default Navbar;
