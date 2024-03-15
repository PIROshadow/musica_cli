import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

let currentNetwork;

NetInfo.fetch().then(state => {
  currentNetwork = state.isConnected;
});

const CheckConnection = () => {
  const [netInfo, setNetInfo] = useState(currentNetwork);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isConnected);
    });
    return () => unsubscribe();
  }, [netInfo]);

  return netInfo;
};

export { CheckConnection };