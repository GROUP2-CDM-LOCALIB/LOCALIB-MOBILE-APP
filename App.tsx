import "./global.css";
import React, { useState, useEffect } from 'react';
import { LoadScreen } from './src/features/auth/screens/startScreen';
import { SignInScreen } from './src/features/auth/screens/signInScreen';
import { RegisterScreen } from './src/features/auth/screens/registerScreen'; 
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts, 
  Poppins_400Regular, 
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_300Light
} from '@expo-google-fonts/poppins';
import { 
  PlusJakartaSans_400Regular, 
  PlusJakartaSans_600SemiBold 
} from '@expo-google-fonts/plus-jakarta-sans';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'signIn' | 'register'>('start');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  if (currentScreen === 'signIn') {
    return (
      <SignInScreen 
        onNavigateToRegister={() => setCurrentScreen('register')} 
      />
    );
  }

 if (currentScreen === 'register') {
    return (
      <RegisterScreen 
        onBackToSignIn={() => setCurrentScreen('signIn')}
      />
    );
  }

  return <LoadScreen onStart={() => setCurrentScreen('signIn')} />;
}