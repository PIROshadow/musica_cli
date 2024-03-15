import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import { CheckConnection } from '../utils/CheckConnection';
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useClerk, useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';

WebBrowser.maybeCompleteAuthSession();

export default function LogIn() {
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

    const { user } = useClerk();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const animation = useRef(null);
    const networkInformation = CheckConnection();

    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const googleLogin = async () => {
        setLoading(true);
        try {
            // const { createdSessionId, signIn, signUp, setActive } =
            //     await startOAuthFlow();

            // if (createdSessionId) {
            //     setActive({ session: createdSessionId });
            //     navigation.reset({ index: 0, routes: [{ name: "Home" }] });
            // } else {
            //     navigation.reset({ index: 0, routes: [{ name: "Home" }] });
            // }
            navigation.reset({ index: 0, routes: [{ name: "HomeStack" }] });
        } catch (err) {
            console.log("error", JSON.stringify(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(user);
        try {
            if (user) {
                navigation.reset({ index: 0, routes: [{ name: "Home" }] });
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (

        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex flex-col items-center justify-center h-screen">
                    <View className="flex-1 justify-center">
                        <View className="p-4">
                            <Text
                                className="text-3xl text-center font-bold text-purple-700 w-72">
                                Generate Royalty Free Music in Seconds
                            </Text>
                            <Text
                                className="text-sm font-medium text-center text-[#282828] mt-3 mb-5">
                                Instant Generation, Zero Effort!
                            </Text>
                        </View>
                        <View className="justify-center items-center">
                            <LottieView
                                autoPlay
                                ref={animation}
                                style={{
                                    width: 250,
                                    height: 250,
                                    backgroundColor: '#fff',
                                }}
                                // Find more Lottie files at https://lottiefiles.com/featured
                                source={require('../assets/music_Animation.json')}
                            />
                        </View>
                    </View>
                    <View
                        className={`h-24 mb-6 p-4 w-full`}><>
                            <Button
                                classBtn={'rounded-full'}
                                title={'Login With Google'}
                                loading={loading}
                                icon={<Icon name="google" size={20} color={'#FFF'} />}
                                onPress={() => googleLogin()}
                                haptic="rigid"
                                disable={loading || !networkInformation}
                            />
                            <View className="mt-2 flex flex-row justify-center items-center">
                                <TouchableOpacity
                                    disable={!networkInformation}
                                    onPress={() => {
                                        trigger('soft', options);
                                        Linking.openURL(
                                            '',
                                        );
                                    }}>
                                    <Text
                                        style={{ fontFamily: 'Inter-SemiBold' }}
                                        className="text-xs text-center text-black opacity-70">
                                        Privacy Policy
                                    </Text>
                                </TouchableOpacity>
                                <Text className="text-black opacity-70 text-xs "> • </Text>
                                <TouchableOpacity
                                    disable={!networkInformation}
                                    onPress={() => {
                                        trigger('soft', options);
                                        Linking.openURL(
                                            '',
                                        );
                                    }}>
                                    <Text
                                        style={{ fontFamily: 'Inter-SemiBold' }}
                                        className="text-xs text-center text-black opacity-70">
                                        Terms and Conditions
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 