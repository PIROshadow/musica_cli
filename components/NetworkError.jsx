import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
// import {trigger} from 'react-native-haptic-feedback';
import {CheckConnection} from '../utils/CheckConnection';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NetworkError = () => {
  let network = CheckConnection();
  const [netUpdate, setNetUpdate] = useState(null);

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  useEffect(() => {
    if (network === false) {
      // trigger('notificationWarning', options);
      setNetUpdate(network);
      setTimeout(() => {
        setNetUpdate('disConnected');
      }, 3000);
    }

    if (network === true && netUpdate !== null) {
      // trigger('notificationWarning', options);
      setNetUpdate(network);
      setTimeout(() => {
        setNetUpdate('Connected');
      }, 3000);
    }
  }, [network]);

  return (
    (netUpdate === false || netUpdate === true) && (
      <View className="absolute top-5 bg-transparent w-full items-center">
        <View
          className={`shadow-md shadow-black border border-gray-300 flex bg-white flex-row items-center rounded-full p-1`}>
          <View
            className={`${netUpdate === false && 'bg-red-500'} ${netUpdate === true && 'bg-green-500'
              } aspect-square rounded-full p-[3px]`}>
            <Ionicons name="notifications" color={'white'} size={16} />
          </View>
          <Text className="text-sm font-semibold text-black px-1">
            {netUpdate === false && 'Internet Disconnected!'}
            {netUpdate === true && 'Internet Connected!'}
          </Text>
        </View>
      </View>
    )
  );
};

export default NetworkError;
