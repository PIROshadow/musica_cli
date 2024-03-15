import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
// import { trigger } from 'react-native-haptic-feedback';
// import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { useFonts } from 'expo-font';
import { CheckConnection } from '../utils/CheckConnection';

// const options = {
//   enableVibrateFallback: true,
//   ignoreAndroidSystemSettings: false,
// };

const SettingsScreen = () => {
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
  //   const user = auth().currentUser;
  const user = {};
  const [loading, setLoading] = useState(false);
  const networkInformation = CheckConnection();
  // const networkInformation = true;

  //   useEffect(() => {
  //     GoogleSignin.configure({
  //       webClientId: GOOGLE_WEB_CLIENT_ID,
  //     });
  //   }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      //   await AsyncStorage.removeItem('userLoggedIn');
      //   await auth().signOut();
      //   await GoogleSignin.revokeAccess();
      //   await GoogleSignin.signOut();
      navigation.navigate('SignUp');
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignUp' }],
      });
      setLoading(false);
    } catch (error) { }
  };

  const rateUsLink = () => {
    const androidUrl = 'market://details?id=com.emailwriter';
    const iosUrl = 'itms-apps://itunes.apple.com/app/your-app-id';

    return Platform.OS === 'ios' ? iosUrl : androidUrl;
  };

  return (
    <SafeAreaView className="flex flex-col bg-white h-full pb-16">
      <Navbar title={'Settings'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-4 py-2">
          <View className="flex flex-col items-center justify-center">
            {user?.photoURL ? (
              <Image
                className="w-28 h-28 rounded-full"
                src={user?.photoURL}
                alt="No"
              />
            ) : (
              <Image
                className="w-28 h-28 rounded-full"
                source={require('../assets/avatar.png')}
              />
            )}
            <Text
              style={{ fontFamily: 'Inter-SemiBold' }}
              className="text-2xl text-black capitalize mt-2">
              {user?.displayName} username
            </Text>
            <Text
              style={{ fontFamily: 'Inter-Regular' }}
              className="text-sm text-black">
              {user?.email} email@gmail.com
            </Text>
          </View>
          <View className="flex flex-col items-center justify-center my-5">
            {[
              {
                title: 'Rate Us',
                url: rateUsLink(),
              },
              {
                title: 'Privacy Policy',
                url: 'https://0360labs.notion.site/Privacy-Policy-Insta-Bio-17428ebe8dd14a0e89aa9e216d66c68f',
              },
              {
                title: 'Terms and Conditions',
                url: 'https://0360labs.notion.site/Terms-and-Conditions-Youtube-Titles-103ad1cf1efa435b855485ee10864129',
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                disabled={!networkInformation}
                onPress={() => {
                  //   trigger('soft', options);
                  Linking.openURL(item.url);
                }}
                className={`justify-center items-center h-12 rounded-lg w-full my-1 bg-white border border-gray-200 shadow-md shadow-gray-400`}>
                <Text
                  style={{ fontFamily: 'Inter-Medium' }}
                  className="text-base text-center text-black">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
            <Button
              classBtn={'rounded-lg w-full my-1'}
              title={'Logout'}
              loading={loading}
              icon={<MaterialIcons name="logout" size={20} color="white" />}
              onPress={() => handleLogout()}
              haptic="rigid"
              disable={!networkInformation}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
