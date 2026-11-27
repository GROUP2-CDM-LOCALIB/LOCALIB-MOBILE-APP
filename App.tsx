import "./global.css";
import React, { useState, useEffect } from 'react';
import { LoadScreen } from './src/features/auth/screens/startScreen';
import { SignInScreen } from './src/features/auth/screens/signInScreen';
import { RegisterScreen } from './src/features/auth/screens/registerScreen'; 
import { DashboardScreen } from './src/features/main/screens/dashboardScreen';
import { SearchScreen } from './src/features/main/screens/searchScreen';
import { MainTab } from './src/features/main/components/bottomNavigation';
import { CategoryScreen } from './src/features/main/screens/categoryScreen';
import { BookItem } from './src/features/main/components/books';
import { BookDetails } from './src/features/main/screens/bookDetails';
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
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "./src/lib/firebase";


SplashScreen.preventAutoHideAsync();

export default function App() {
  onAuthStateChanged(auth, (user) => {
    console.log(user)
  })
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true); // Waiting for the bouncer to check
  const [currentScreen, setCurrentScreen] = useState<'start' | 'signIn' | 'register' | 'dashboard' | 'search' | 'category' | 'bookDetails'>('start');

  // 1. Check for the "wristband" once when the app opens
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false); // Done checking!

      // If they are logged in and sitting on start/signIn, send them to dashboard
      if (currentUser) {
        setCurrentScreen('dashboard');
      }
    });

    return unsubscribe; // Clean up the listener when the app closes
  }, []);

  const handleTabNavigation = (tab: MainTab) => { // para kay rene
    if (tab === 'Explore') setCurrentScreen('dashboard');
    if (tab === 'Search') setCurrentScreen('search');
  };

  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [previousScreen, setPreviousScreen] = useState<'dashboard' | 'search' | 'category'>('dashboard');

  const handleOpenBook = (book: BookItem, from: 'dashboard' | 'search' | 'category') => {
    setSelectedBook(book);
    setPreviousScreen(from);
    setCurrentScreen('bookDetails');
  };

  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    books: BookItem[];
  }>({ name: '', books: [] });

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
  });

  const handleSignOut = async () => {
      try {
        await signOut(auth); // Destroys the wristband on the phone!
        setCurrentScreen('signIn');
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

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
        onSignOut={handleSignOut}
        onNavigateToSearch={() => setCurrentScreen('search')}
        onNavigateTab={handleTabNavigation}
        onSelectCategory={(name, books) => {
          setSelectedCategory({ name, books });
          setCurrentScreen('category');
        }}
        onSelectBook={(book) => handleOpenBook(book, 'dashboard')}
      />
    );
  }

  if (currentScreen === 'category') {
    return (
      <CategoryScreen
        categoryName={selectedCategory.name}
        books={selectedCategory.books}
        onBack={() => setCurrentScreen('dashboard')}
        onSignOut={handleSignOut}
        onNavigateToSearch={() => setCurrentScreen('search')}
        onNavigateTab={handleTabNavigation}
        onSelectBook={(book) => handleOpenBook(book, 'category')}
      />
    );
  }

  if (currentScreen === 'search') {
    return (
      <SearchScreen 
        onSignOut={handleSignOut}
        onNavigateTab={handleTabNavigation}
        onSelectBook={(book) => handleOpenBook(book, 'search')}
      />
    );
  }

  if (currentScreen === 'bookDetails' && selectedBook) {
    return (
      <BookDetails
        book={selectedBook}
        onBack={() => setCurrentScreen(previousScreen)}
        onSignOut={handleSignOut}
        onNavigateToSearch={() => setCurrentScreen('search')}
        onNavigateTab={handleTabNavigation}
        onSelectBook={(nextBook) => setSelectedBook(nextBook)}
        onExploreShelf={(name, books) => {
          setSelectedCategory({ name, books });
          setCurrentScreen('category');
        }}
      />
    );
  }

  

return (
    <LoadScreen 
      onStart={() => setCurrentScreen(user ? 'dashboard' : 'signIn')} 
    />
  );
}