import "./global.css";
import React, { useState, useEffect } from 'react';
import { LoadScreen } from './src/features/auth/screens/startScreen';
import { SignInScreen } from './src/features/auth/screens/signInScreen';
import { RegisterScreen } from './src/features/auth/screens/registerScreen'; 
import { DashboardScreen } from './src/features/main/screens/dashboardScreen';
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
  const [currentScreen, setCurrentScreen] = useState<'start' | 'signIn' | 'register' | 'dashboard'>('start');

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
        onSignIn={() => setCurrentScreen('dashboard')}
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

  if (currentScreen === 'dashboard') {
    return (
      <DashboardScreen 
      onSignOut={() => setCurrentScreen('signIn')}
    />
    );
  }

  return <LoadScreen onStart={() => setCurrentScreen('signIn')} />;
}