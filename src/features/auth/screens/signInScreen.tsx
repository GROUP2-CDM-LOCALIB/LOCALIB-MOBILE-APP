import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, SlideOutLeft } from 'react-native-reanimated';
import { AuthHeaderLayout } from '../components/authHeader';

interface SignInScreenProps {
  onSignIn?: (studentNo: string, password: string) => void;
  onNavigateToRegister?: () => void;
  onForgotPassword?: () => void;
  onGoogleSignIn?: () => void;
}

export function SignInScreen({
  onSignIn,
  onNavigateToRegister,
  onForgotPassword,
  onGoogleSignIn,
}: SignInScreenProps) {
  const [studentNo, setStudentNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    onSignIn?.(studentNo.trim(), password);
  };

  return (
    <AuthHeaderLayout>
      <Animated.View 
        entering={FadeIn.duration(400).delay(150)}
        exiting={SlideOutLeft.duration(400).delay(150)}
        className="flex-1">

        <View className="items-center gap-0">
          <Text className="text-[26px] m-0 font-poppins-bold text-[#1E1C1A]">Sign In</Text>
          <Text className="text-[12px] m-0 font-poppins-medium text-[#7A756D]">
            Access your Local Library now
          </Text>
        </View>

        <View className="bg-[#E9E4DC] rounded-[12px] px-4 py-3 mb-2 mt-6">
          <TextInput
            value={studentNo}
            onChangeText={setStudentNo}
            placeholder="Student No."
            placeholderTextColor="#8C867E"
            autoCapitalize="none"
            className="text-sm text-[#1E1C1A]"
          />
        </View>

        <View className="flex-row items-center bg-[#E9E4DC] rounded-[12px] px-4 py-3 mb-3.5 mt-2">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#8C867E"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            className="flex-1 text-sm text-[#1E1C1A] pr-2"
          />
          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            hitSlop={10}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#7A756D"
            />
          </Pressable>
        </View>

        <TouchableOpacity
          onPress={onForgotPassword}
          activeOpacity={0.7}
          className="self-center mt-5 mb-7"
        >
          <Text className="text-sm font-poppins-medium text-[#5C5346]">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignIn}
          activeOpacity={0.85}
          className="bg-[#5A4A28] rounded-[12px] py-4 items-center shadow-sm"
        >
          <Text className="text-white text-[14px] font-poppins-semibold tracking-wide">
            Sign In
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center my-5">
          <View className="flex-1 h-[1px] bg-[#E2DDD3]" />
          <Text className="text-[11px] text-[#9A948B] mx-3">
            or
          </Text>
          <View className="flex-1 h-[1px] bg-[#E2DDD3]" />
        </View>

        <TouchableOpacity
          onPress={onGoogleSignIn}
          activeOpacity={0.8}
          className="flex-row items-center justify-center bg-white border border-[#E2DDD3] rounded-xl py-3.5"
        >
          <Ionicons name="logo-google" size={18} />
          <Text className="text-[13px] font-poppins-medium text-[#2E2B27] ml-2.5">
            Continue with Google
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mt-auto pt-6">
          <Text className="text-sm text-[#7A756D]">
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={onNavigateToRegister} activeOpacity={0.7}>
            <Text className="text-sm font-bold text-[#5A4A28]">
              Register now
            </Text>
          </TouchableOpacity>

        </View>
      </Animated.View>
    </AuthHeaderLayout>
  );
}