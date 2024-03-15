// import { useAuth, useClerk } from "@clerk/clerk-expo";
// import { useNavigation } from "@react-navigation/native";
// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Text, View, TouchableOpacity } from 'react-native';


// export default function Home() {
//   const { user } = useClerk();
//   const navigation = useNavigation();
//   const {isSignedIn, isLoaded} = useAuth();
//   if (isSignedIn == false || isLoaded == false) {
//     return (
//       <View className="flex-1 items-center justify-center bg-red-500">
//       <Text className="text-purple-500">Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//     );
//   } else {

//     return (
//       <View>
//         <>
//           <Text>
//             Hello, {user.firstName + " " + user.lastName} welcome to Clerk!
//           </Text>
//           <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
//             <Text>Profile</Text>
//           </TouchableOpacity>
//         </>
//       </View>
//     );
//   }
// }
import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {promptResult} from '../api/prompt';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { CheckConnection } from '../utils/CheckConnection';
import { useFonts } from 'expo-font';

export const tone = [
  { label: '👔 No Style', value: 'No Style' },
  { label: '💼 Classical', value: 'Classical' },
  { label: '🎨 Pop', value: 'Pop' },
  { label: '📝 Rap', value: 'Rap' },
  { label: '😊 Hip Hop', value: 'Hip Hop' },
  { label: '🧐 Rock', value: 'Rock' },
  { label: '🏃 Techno', value: 'Techno' },
  { label: '😐 Jazz', value: 'Jazz' },
  { label: '😃 K Pop', value: 'K Pop' },
  { label: '😎 Country', value: 'Country' },
  { label: '⏰ Afrobates', value: 'Afrobates' },
];

const GenerateScreen = ({ route }) => {
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
  const networkInfomation = CheckConnection();
  // const networkInfomation = true;
  const { params } = route;
  const { screenType = '', temp_tone = '', temp_input = '' } = params || {};
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    contentDetail: temp_input ? temp_input : '',
    tone: temp_tone ? temp_tone : 'No Style',
    charRange: 'Medium',
  });

  const totalContentWords = inputString => {
    const trimmedString = inputString.trim();
    const wordsArray = trimmedString.split(/\s+/);
    const nonEmptyWordsArray = wordsArray.filter(word => word !== '');
    return nonEmptyWordsArray.length;
  };

  const handleInputChange = (field, newValue) => {
    setValue(prevValues => ({
      ...prevValues,
      [field]: newValue,
    }));
  };

  const handlePromptGenerate = async () => {
    if (value.contentDetail.trim() === '') {
      Alert.alert('Musica', 'Enter Something!');
    } else {
      try {
        setLoading(true);
        // const result = await promptResult(value, screenType);
        // if (result === false) {
        //   Alert.alert(
        //     'Musica',
        //     'Something went wrong! Try Again',
        //   );
        // } else {
        // let recentWorkUser = await firestore()
        //   .collection('history')
        //   .doc(user.uid)
        //   .get();

        // if (recentWorkUser._data) {
        //   await firestore()
        //     .collection('history')
        //     .doc(user.uid)
        //     .update({
        //       recent_work: [
        //         ...recentWorkUser._data.recent_work,
        //         {
        //           input_content: value.contentDetail,
        //           char_length: value.charRange,
        //           content_tone: value.tone,
        //           input_result: result,
        //           new_email: screenType === 'new' ? true : false,
        //           created_at: new Date(),
        //         },
        //       ],
        //     })
        //     .then(console.log('Result created successfully!'))
        //     .catch();
        // } else {
        //   await firestore()
        //     .collection('history')
        //     .doc(user.uid)
        //     .set({
        //       user_id: user.uid,
        //       user_email: user.email,
        //       recent_work: [
        //         {
        //           input_content: value.contentDetail,
        //           char_length: value.charRange,
        //           content_tone: value.tone,
        //           input_result: result,
        //           new_email: screenType === 'new' ? true : false,
        //           created_at: new Date(),
        //         },
        //       ],
        //     })
        //     .then(() => console.log('History created successfully!'))
        //     .catch(err => console.log(err));
        // }
        setLoading(false);
        navigation.navigate('Result', {
          data: {
            content: "rainy weather",
            type: 'No Style',
            duration: 'Medium',
            created_at: '2024-03-03T00:00:00'
          }
        });
        // }
      } catch (error) {
        setLoading(false);
        Alert.alert('Musica', 'Something went wrong!');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="bg-white h-full">
        <Navbar title={'Musica'} />
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="px-4 py-4">
              <View>
                <View className="flex-row justify-between items-center">
                  <Text
                    style={{ fontFamily: 'Inter-SemiBold' }}
                    className="text-base text-black">
                    Prompt / Suggestion
                  </Text>
                  <Text
                    style={{ fontFamily: 'Inter-Regular' }}
                    className="text-sm font-normal text-black opacity-70">
                    {totalContentWords(value.contentDetail)} Words
                  </Text>
                </View>
                <TextInput
                  multiline={true}
                  numberOfLines={8}
                  className="bg-purple-50 border border-purple-300 px-3 py-2 rounded-lg text-sm text-black mt-1 max-h-36"
                  placeholder={'What\'s on your mind?'}
                  style={{
                    textAlignVertical: 'top',
                    fontFamily: 'Inter-Regular',
                  }}
                  placeholderTextColor="#000"
                  value={value.contentDetail}
                  onChangeText={text =>
                    handleInputChange('contentDetail', text)
                  }
                />
              </View>
              <View className="mt-4">
                <Text
                  style={{ fontFamily: 'Inter-SemiBold' }}
                  className="text-base text-black">
                  Durtaion
                </Text>
                <View className="flex-row flex-wrap mt-1">
                  {['Short', 'Medium', 'Long'].map(item => (
                    <Pressable
                      key={item}
                      className={`${value.charRange === item
                        ? 'bg-purple-100 border-purple-400'
                        : 'bg-purple-50 border-transparent'
                        } border rounded-lg p-[6px] min-w-[65px] mr-1 mt-1`}
                      onPress={() => handleInputChange('charRange', item)}>
                      <Text
                        style={{ fontFamily: 'Inter-Regular' }}
                        className="text-black text-center text-sm">
                        {item}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
              <View className="mt-4 mb-5">
                <Text
                  style={{ fontFamily: 'Inter-SemiBold' }}
                  className="text-base text-black">
                  Muscial Tone
                </Text>
                <View className="flex-row flex-wrap mt-1">
                  {tone.map(item => (
                    <Pressable
                      key={item.value}
                      className={`${value.tone === item.value
                        ? 'bg-purple-100 border-purple-400'
                        : 'bg-purple-50 border-transparent'
                        } border rounded-lg p-[6px] mr-1 mt-1`}
                      onPress={() => handleInputChange('tone', item.value)}>
                      <Text
                        style={{ fontFamily: 'Inter-Regular' }}
                        className="text-black text-sm">
                        {item.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
              <Button
                loading={loading}
                classBtn={'rounded-full shadow-lg shadow-black'}
                onPress={() => handlePromptGenerate()}
                title={'Generate'}
                icon={<FontAwesome5 name="magic" size={18} color="white" />}
                haptic="rigid"
                disable={!networkInfomation || loading}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default GenerateScreen;
