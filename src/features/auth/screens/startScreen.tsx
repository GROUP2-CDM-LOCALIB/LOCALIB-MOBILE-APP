import React, { useEffect } from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import StartBackground from '../../../../assets/another.png';
import LocalibLogo from '../../../../assets/3.svg';

interface LoadScreenProps{
  onStart?: () => void;
}

export function LoadScreen({ onStart }: LoadScreenProps){

  const pillScale = useSharedValue(1);

  useEffect(() => {
    pillScale.value = withRepeat(
      withSequence(
        withDelay(2400, withTiming(1.07, { duration: 150, easing: Easing.out(Easing.ease) })),
        withTiming(0.98, { duration: 120 }),
        withTiming(1.04, { duration: 130 }),
        withTiming(1, { duration: 200 })
      ),
      -1, 
      false
    );
  }, [pillScale]);

  const animatedPillStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pillScale.value }],
  }));

return (
    <Pressable className="flex-1" onPress={onStart}>
      <StatusBar style="light" />

      <Image
        source={StartBackground}
        style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
        resizeMode="cover"
      />

      <View className="flex-1 pointerEvents-none justify-between py-16 px-6">
        
        <View className="flex-1 items-center justify-center">
          <Animated.View entering={FadeInDown.duration(700).delay(100)}>
            <LocalibLogo width={110} height={110} />
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.duration(700).delay(300)}
            className="text-[32px] font-extrabold text-white tracking-[3px] mt-4 mb-1.5">
            LOCALIB
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.duration(700).delay(500)}
            className="text-xs font-jakarta text-[#D4AF37] tracking-[3.5px]">
            POCKET KNOWLEDGE
          </Animated.Text>
        </View>

        <Animated.View
          entering={FadeInUp.duration(700).delay(700)}
          className="items-center mb-3">

          <Animated.View
            style={animatedPillStyle}
            className="flex-row items-center bg-white/10 border border-white/25 py-2 px-4 rounded-full">

            <Text className="text-[#EAEAEA] text-sm font-jakartaS mr-2.5">
              Tap anywhere to start
            </Text>

            <Text className="text-[#D4AF37] text-lg font-semibold -mt-0.5">
              ›
            </Text>

          </Animated.View>

        </Animated.View>

      </View>
    </Pressable>
  );
}