import React from 'react';
import { View, Button, Alert } from 'react-native';

const TestScreen = ({navigation}) => {
  const showAlert = () => {
    Alert.alert(
      "Alert Title", // Title of the alert
      "This is the alert message", // Message inside the alert
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => navigation.navigate('SocialLogin') }
      ],
      { cancelable: false } // If false, the alert cannot be dismissed by tapping outside
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Alert" onPress={showAlert} />
    </View>
  );
};

export default TestScreen;
