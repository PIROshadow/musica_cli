import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';

const History = () => {
    const navigation = useNavigation();

    const [recentHistory, setRecentHistory] = useState([
        {
        content: "patriotism dance background",
        type: 'Jazz',
        duration: 'Medium',
        created_at: '2024-03-03T00:00:00'
    },
        {
        content: "high bit fight scene",
        type: 'Hip Hop',
        duration: 'Short',
        created_at: '2024-03-03T00:00:00'
    },
]);
    const [loading, setLoading] = useState(false);

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

    //   const recentWorkAPI = async () => {
    //     try {
    //       setLoading(true);
    //       const userHistoryInfo = await firestore()
    //         .collection('history')
    //         .doc(user.uid)
    //         .get();

    //       const recentWork = userHistoryInfo.data().recent_work || [];

    //       const sortedRecentWork = recentWork.sort(
    //         (a, b) => b.created_at.toDate() - a.created_at.toDate(),
    //       );

    //       setRecentHistory(sortedRecentWork);
    //     } catch (error) {
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   const fetchData = useCallback(() => {
    //     if (user) {
    //       recentWorkAPI();
    //     }
    //   }, [user]);

    //   useEffect(() => {
    // fetchData();
    //   }, [fetchData]);

    // it will fetch data once user comes to home screen
    //   useFocusEffect(
    //     useCallback(() => {
    //       fetchData();
    //     }, [fetchData]),
    //   );

    return (
        <SafeAreaView className="flex flex-col bg-white h-full pb-16">
            <Navbar title={'History'} />
            <View className="flex-1 pt-0">
                <ScrollView showsVerticalScrollIndicator={false} className="mt-1 mb-5">
                    {loading ? (
                        <View
                            className={`bg-white rounded-lg p-3 border border-gray-100 shadow-md shadow-gray-400 mx-3 my-3`}>
                            <Text
                                style={{ fontFamily: 'Inter-Medium' }}
                                className="text-sm text-black"
                                numberOfLines={1}>
                                Loading...
                            </Text>
                        </View>
                    ) : recentHistory.length > 0 ? (
                        <>
                            {recentHistory.map((item, index) => {
                                const dateUpdated = new Date(item.created_at);
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        className={`bg-white shadow-md shadow-gray-400 rounded-lg mx-3 p-3 my-1 border border-gray-100 ${index === 0 ? 'mt-3' : ''
                                            } ${index === recentHistory.length - 1 ? 'mb-3' : ''}`}
                                        onPress={() => {
                                            // trigger('soft', options);
                                            navigation.navigate('Result', {
                                                itemId: index,
                                                data: item,
                                            });
                                        }}>
                                        <Text
                                            style={{ fontFamily: 'Inter-Medium' }}
                                            className="text-xs font-medium text-[#C13584]">
                                            {`${dateUpdated.getDate()}/${dateUpdated.getMonth()}/${dateUpdated.getFullYear()}`} • {item.type} • {item.duration}
                                        </Text>
                                        <Text
                                            style={{ fontFamily: 'Inter-Medium' }}
                                            className="text-sm font-semibold text-[#282828]"
                                            numberOfLines={2}>
                                            {item.content}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </>
                    ) : (
                        <View
                            className={`bg-white rounded-lg p-3 border border-gray-100 shadow-md shadow-gray-400 mx-3 my-3`}>
                            <Text style={{ fontFamily: 'Inter-Medium' }} className="text-sm text-black">
                                No music currently. Please generate music first!
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default History;
