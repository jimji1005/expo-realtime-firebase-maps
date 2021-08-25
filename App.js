import 'expo-dev-client';
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Nav from './src/Navigation';
import SignInSignUpScreen from './src/SignInSignUpScreen';
import firebaseApp from "./src/firebaseConfig";
import { AuthProvider } from "./src/auth-context";

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged', user);
      setUser(user);
    });
  }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        {user ? <Nav/> : <SignInSignUpScreen/>}
      </SafeAreaProvider>
    </AuthProvider>
  );
}
