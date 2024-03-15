import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const navigation = useNavigation();

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }
    } catch (err) {
      console.log("error", JSON.stringify(err));
    }
  };

  return <Button title="Sign in with Google" onPress={onPress} />;
};
export default SignInWithOAuth;
