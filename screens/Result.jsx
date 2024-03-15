import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, TouchableOpacity, Share } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import * as FileSystem from 'expo-file-system';
import { useFonts } from 'expo-font';
// import Share from 'react-native-share';

const ResultScreen = ({ route }) => {
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
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    const { data } = route.params;
    const dateUpdated = new Date(data.created_at);

    async function playSound() {
        if (!isPlaying) {
            await sound.playAsync();
            setIsPlaying(true);
        } else {
            await sound.stopAsync();
            setIsPlaying(false);
        }
    }

    useEffect(async () => {
        console.log('Loading Sound');
        const sound = new Audio.Sound()

        await sound.loadAsync({
            uri: 'https://dczqjodjshowsziauzfw.supabase.co/storage/v1/object/public/songs/ethereal-buzztrap-lead_148bpm_F_minor.wav'
        })

        setSound(sound);

        const { positionMillis, durationMillis } = await sound.getStatusAsync();
        setPosition(positionMillis / 1000);
        setDuration(durationMillis / 1000);
    }, [])

    useEffect(() => {
        const updatePosition = async () => {

            if (sound) {
                const { positionMillis, durationMillis } = await sound.getStatusAsync();
                setPosition(positionMillis / 1000);
                setDuration(durationMillis / 1000);
            }
        };

        const intervalId = setInterval(updatePosition, 1000);

        return () => clearInterval(intervalId);
    }, [sound, isPlaying]);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="left-3 p-1 flex items-center">
                    <Ionicons name="arrow-back-outline" size={28} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const copyToClipboard = () => {
        // trigger('soft', options);
        // Clipboard.setString(bio);
    };
    const downloadSong = async () => {
        try {
            const fileUri = FileSystem.documentDirectory + 'small.wav';
            const downloadResumable = FileSystem.createDownloadResumable(
                'https://dczqjodjshowsziauzfw.supabase.co/storage/v1/object/public/songs/ethereal-buzztrap-lead_148bpm_F_minor.wav',
                fileUri
            );

            const { uri } = await downloadResumable.downloadAsync();

        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

    const shareSong = async () => {
        try {
            const fileUri = FileSystem.documentDirectory + 'small.wav';

            await Share.share({
                message: 'Downlad the latest generated music by me at https://dczqjodjshowsziauzfw.supabase.co/storage/v1/object/public/songs/ethereal-buzztrap-lead_148bpm_F_minor.wav',
            });

        } catch (error) {
            console.error('Error sharing the file:', error);
        }
    }


    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <Navbar back={true} title={'Result'} />
            <View showsVerticalScrollIndicator={false} className="h-full mx-3 my-3">
                <View>
                    <View className="flex-row">
                        <Text
                            style={{ fontFamily: 'Inter-SemiBold' }}
                            className="text-base ">
                            Generation Date:{' '}
                        </Text>
                        <Text
                            style={{ fontFamily: 'Inter-Medium' }}
                            className="text-base text-gray-600">
                            {`${dateUpdated.getDate()}/${dateUpdated.getMonth()}/${dateUpdated.getFullYear()}`}
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text
                            style={{ fontFamily: 'Inter-SemiBold' }}
                            className="text-base ">
                            Music Type:{' '}
                        </Text>
                        <Text
                            style={{ fontFamily: 'Inter-Medium' }}
                            className="text-base text-gray-600">
                            {data.type}
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text
                            style={{ fontFamily: 'Inter-SemiBold' }}
                            className="text-base ">
                            Music Lengt:{' '}
                        </Text>
                        <Text
                            style={{ fontFamily: 'Inter-Medium' }}
                            className="text-base text-gray-600">
                            {data.duration}
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text
                            style={{ fontFamily: 'Inter-SemiBold' }}
                            className="text-base ">
                            Prompt:{' '}
                        </Text>
                        <Text
                            style={{ fontFamily: 'Inter-Medium' }}
                            className="text-base text-gray-600">
                            {data.content}
                        </Text>
                    </View>
                </View>
                <View className="flex-row mt-8 justify-between px-4">
                    <Text style={{ fontFamily: 'Inter-Medium' }}>{formatTime(position)}</Text>
                    <Text style={{ fontFamily: 'Inter-Medium' }}>{formatTime(duration)}</Text>
                </View>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={Math.floor(duration)}
                    minimumTrackTintColor="#333333"
                    maximumTrackTintColor="#000000"
                    value={Math.floor(position)}
                />
                <Button title={isPlaying ? 'Stop' : 'Play'} onPress={playSound} classBtn="mt-4" />
                <View className="w-full flex-row pt-4">
                    {/* <Button
                        classBtn={'rounded-full flex-grow'}
                        title={'Send Email'}
                        onPress={() => sendEmail()}
                        haptic="rigid"
                        short={true}
                    /> */}
                    <Button
                        classBtn={'rounded-full p-3 !bg-purple-50 border border-purple-100'}
                        onPress={downloadSong}
                        icon={<Ionicons name="download-outline" size={22} color="rgb(126 34 206)" />}
                        haptic="soft"
                        short={true}
                    />
                    <Button
                        classBtn={'rounded-full p-3 !bg-purple-50 ml-2 border border-purple-100'}
                        onPress={shareSong}
                        icon={<MaterialIcons name="share" size={20} color="rgb(126 34 206)" />}
                        haptic="soft"
                        short={true}
                    />
                    <Button
                        classBtn={'rounded-full p-3 !bg-purple-50 ml-2 border border-purple-100'}
                        onPress={() => { }}
                        icon={<MaterialIcons name="delete" size={20} color="rgb(126 34 206)" />}
                        haptic="soft"
                        short={true}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ResultScreen;
