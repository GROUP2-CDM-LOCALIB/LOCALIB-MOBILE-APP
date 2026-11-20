import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

interface DashboardScreenProps {
    onSignOut?: () => void;
}

const FILTER_TABS = ['All Shelves', 'Currently Reading', 'Local Branches'];

export function DashboardScreen({onSignOut}: DashboardScreenProps) {

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Shelves');

  return (
    <View className="flex-1 bg-[#FAF9F5]">
      {/* Dark icons so they are visible on the light cream top bar */}
      <StatusBar style="dark" />

      {/* 1. Top Navigation Header */}
      <View className="flex-row items-center justify-between px-5 pt-14 pb-3.5 bg-[#D8C77A]">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-lg bg-[#EFECE3] items-center justify-center mr-2.5">
            <Ionicons name="book-outline" size={18} color="#7A6532" />
          </View>
          <Text className="text-xl font-poppins-semibold text-[#1E1C1A]">
            Localib
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity activeOpacity={0.7} className="p-1.5">
            <Ionicons name="notifications-outline" size={22} color="#5A4A28" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSignOut}
            activeOpacity={0.8}
            className="w-9 h-9 rounded-full bg-[#6E5C2E] items-center justify-center"
          >
            <Ionicons name="person-outline" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* 2. Warm Gold Search & Filter Banner */}
        <View className="bg-[#D8C77A] px-5 pt-4 pb-5 rounded-b-[28px]">
          {/* Menu Button + Search Bar Row */}
          <View className="flex-row items-center gap-3 mb-4">
            <TouchableOpacity
              activeOpacity={0.8}
              className="w-12 h-12 rounded-2xl bg-[#FAF9F5] items-center justify-center shadow-sm"
            >
              <Ionicons name="menu-outline" size={24} color="#2E2B27" />
            </TouchableOpacity>

            <View className="flex-1 flex-row items-center bg-[#FAF9F5] rounded-full px-4 h-12 shadow-sm">
              <Ionicons name="search-outline" size={20} color="#8C867E" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search in Localib..."
                placeholderTextColor="#8C867E"
                className="flex-1 text-sm text-[#1E1C1A] ml-2.5"
              />
              <TouchableOpacity activeOpacity={0.7}>
                <Ionicons name="barcode-outline" size={20} color="#5A4A28" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Horizontal Filter Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {FILTER_TABS.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <Pressable
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full ${
                    isSelected ? 'bg-[#5A4A28]' : 'bg-[#FAF9F5]'
                  }`}
                >
                  <Text
                    className={`text-xs font-poppins-medium ${
                      isSelected ? 'text-white' : 'text-[#3B3731]'
                    }`}
                  >
                    {tab}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* 3. Section 1: Saved Books */}
        <View className="px-5 mt-6">
          <View className="flex-row items-center justify-between mb-3.5">
            <View className="flex-row items-center">
              <Text className="text-lg font-poppins-bold text-[#1E1C1A]">
                Saved Books
              </Text>
              <View className="bg-[#EFE9D5] px-2.5 py-0.5 rounded-full ml-2.5">
                <Text className="text-[11px] font-poppins-medium text-[#7A6532]">
                  0 items
                </Text>
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-xs font-poppins-medium text-[#7A756D]">
                Browse more ›
              </Text>
            </TouchableOpacity>
          </View>

          {/* Empty Container for Saved Books */}
          <View className="h-48 rounded-2xl border border-dashed border-[#D6CFC2] bg-[#F4F1EA] items-center justify-center px-6">
            <Ionicons name="bookmarks-outline" size={26} color="#9A948B" />
            <Text className="text-xs font-poppins-medium text-[#7A756D] mt-2 text-center">
              Saved books horizontal list will go here
            </Text>
          </View>
        </View>

        {/* 4. Section 2: Science & Nature */}
        <View className="px-5 mt-7">
          <View className="flex-row items-center justify-between mb-3.5">
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-[#D4AF37] mr-2" />
              <Text className="text-lg font-poppins-bold text-[#1E1C1A]">
                Science & Nature
              </Text>
            </View>

            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-xs font-poppins-medium text-[#7A756D]">
                Browse more ›
              </Text>
            </TouchableOpacity>
          </View>

          {/* Empty Container for Science & Nature Books */}
          <View className="h-48 rounded-2xl border border-dashed border-[#D6CFC2] bg-[#F4F1EA] items-center justify-center px-6">
            <Ionicons name="library-outline" size={26} color="#9A948B" />
            <Text className="text-xs font-poppins-medium text-[#7A756D] mt-2 text-center">
              Science & Nature books container
            </Text>
          </View>
        </View>

        {/* 5. Section 3: Self-Help & Personal Growth */}
        <View className="px-5 mt-7">
          <View className="flex-row items-center justify-between mb-3.5">
            <View className="flex-row items-center flex-1 pr-2">
              <View className="w-2 h-2 rounded-full bg-[#D4AF37] mr-2" />
              <Text className="text-lg font-poppins-bold text-[#1E1C1A]">
                Self-Help & Personal Growth
              </Text>
            </View>

            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-xs font-poppins-medium text-[#7A756D]">
                Browse more ›
              </Text>
            </TouchableOpacity>
          </View>

          {/* Empty Container for Self-Help Books */}
          <View className="h-48 rounded-2xl border border-dashed border-[#D6CFC2] bg-[#F4F1EA] items-center justify-center px-6">
            <Ionicons name="sparkles-outline" size={26} color="#9A948B" />
            <Text className="text-xs font-poppins-medium text-[#7A756D] mt-2 text-center">
              Self-Help & Personal Growth books container
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}