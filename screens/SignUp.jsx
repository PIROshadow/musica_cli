// import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

// import { useSignIn, useSignUp } from "@clerk/clerk-react";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
 
export default function SignUp() {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  return (
    <View>
    <TextInput
      placeholder="Username"
      value={username}
      onChangeText={setUsername}
    />
    <TextInput
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />
    <Button title="Register"/>
  </View>
);
}