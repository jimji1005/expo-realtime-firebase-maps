import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Pressable, TextInput, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from "./auth-context";

export default function SignInSignOutScreen() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const { signin, signup } = useAuth();

  const signUserUp = async () => {
    if (!userEmail || !userPassword) {
      return Alert.alert('Please fill out the useremail and password');
    }

    const signUpResult = await signup(userEmail, userPassword);
    console.log('signUpResult', signUpResult);

    if (signUpResult.code) {
      const errorCode = signUpResult.code;
      const errorMessage = signUpResult.message;
      return Alert.alert(errorMessage);
    }
  }

  const signUserIn = async () => {
    const signInResult = await signin(userEmail, userPassword);
    console.log('signUserIn', signInResult);

    if (signInResult.code) {
      const errorCode = signInResult.code;
      const errorMessage = signInResult.message;
      return Alert.alert(errorMessage);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.inputContainer}
          onChangeText={text => setUserEmail(text)}
          value={userEmail}
          placeholder="User Email"
          autoCapitalize="none"
          spellCheck={false}
        />
        <TextInput
          style={styles.inputContainer}
          onChangeText={text => setUserPassword(text)}
          value={userPassword}
          placeholder="User Password"
          secureTextEntry
        />
      </View>
      <View>
        <Pressable onPress={signUserIn} style={styles.buttonContainer}>
          <Text>
            Sign in
          </Text>
        </Pressable>
        <Pressable onPress={signUserUp} style={styles.buttonContainer}>
          <Text>
            Sign Up
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  inputContainer: {
    width: 250,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
});
