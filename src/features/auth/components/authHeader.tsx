import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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

            <Animated.View
              entering={FadeInDown.duration(600)}
              
              className="items-center pt-16 pb-8 px-6 mb-10">

                <View className=" p-4 mt-10">
                    <LocalibLogo width={96} height={96} />
                </View>

                <Text className="text-[32px] mb-0 font-poppins-bold text-white mt-3">
                    LOCALIB
                </Text>

                <Text className="text-[12px] text-white">
                    Bringing Knowledge to your Pocket.
                </Text>

            </Animated.View>


            <Animated.View
              entering={SlideInDown.duration(500).damping(18)}
              className="flex-1 bg-[#FAF9F5] rounded-t-[40px] px-[28px] py-[32px] shadow-2xl mt-10">

              {children}

            </Animated.View>
    </View>
  );
}