import { useClerk } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
    const { user } = useClerk(); 
    const { signOut }= useClerk();
    const handleSignOut = async () => {
        try {
          await signOut();
    
          
          navigation.reset({ index: 0, routes: [{ name: 'SignUp' }] }); 
        } catch (error) {
          console.error("Error signing out:", error);
        }
      };
    const navigation = useNavigation();
    return (
        <View>
        <Text>Profile </Text>
        <Text>First Name : {user.firstName}</Text>
        <Text>Last Name : {user.lastName}</Text>
        <Text>Email Address : {user.emailAddresses[0].emailAddress}</Text>
        <Button title="SignOut" onPress={handleSignOut} />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}><Text>Home</Text></TouchableOpacity>
        </View>
    )
}