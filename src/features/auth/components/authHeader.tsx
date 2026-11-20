import react from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, SlideInDown } from 'react-native-reanimated';
import StartBackground from '../../../../assets/another.png';
import LocalibLogo from '../../../../assets/3.svg';

interface AuthHeaderLayoutProps {
  children: React.ReactNode;
}

export function AuthHeaderLayout({ children }: AuthHeaderLayoutProps) {
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <Image
        source={StartBackground}
        style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
        resizeMode="cover"
      />

      {/* 1. Wrap the layout in KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* 2. Dismiss keyboard when tapping outside inputs */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View className="flex-1">
            
            {/* Header Section */}
            <Animated.View
              entering={FadeInDown.duration(600)}
              className="items-center pt-16 pb-4 px-6 mb-4"
            >
              <View className="p-4 mt-6">
                <LocalibLogo width={96} height={96} />
              </View>

              <Text className="text-[32px] mb-0 font-poppins-bold text-white mt-2">
                LOCALIB
              </Text>

              <Text className="text-[12px] text-white">
                Bringing Knowledge to your Pocket.
              </Text>
            </Animated.View>

            {/* Bottom Sheet Card */}
            <Animated.View
              entering={SlideInDown.duration(500).damping(18)}
              className="flex-1 bg-[#FAF9F5] rounded-t-[40px] px-[28px] pt-[32px] shadow-2xl mt-4 overflow-hidden"
            >
              {/* 3. ScrollView inside the card so only the form scrolls */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 32, // Replaces the bottom padding of the parent View
                }}
              >
                {children}
              </ScrollView>
            </Animated.View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}