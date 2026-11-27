import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LocalibLogo from '../../../../assets/3.svg';

const DEFAULT_FILTER_TABS = ['All Shelves', 'Currently Reading', 'Recently Added'];

interface TopNavigationProps {
  title?: string;
  onSignOut?: () => void;
  onMenuPress?: () => void;

  // Mode A: static
  onSearchBarPress?: () => void;

  // Mode B: typings
  isSearchInput?: boolean;
  searchValue?: string;
  onChangeSearch?: (text: string) => void;
  onSubmitSearch?: () => void;
  onClearSearch?: () => void;

  // filter piils
  showFilterPills?: boolean;
  filterTabs?: string[];
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export function TopNavigation({
  title = 'Localib',
  onSignOut,
  onMenuPress,
  onSearchBarPress,
  isSearchInput = false,
  searchValue = '',
  onChangeSearch,
  onSubmitSearch,
  onClearSearch,
  showFilterPills = true,
  filterTabs = DEFAULT_FILTER_TABS,
  activeTab = 'All Shelves',
  onSelectTab,
}: TopNavigationProps) {
  return (
    <View>
      {/* logo */}
      <View className="flex-row items-center justify-between px-5 pt-14 pb-3.5 bg-[#D8C77A]">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-lg bg-[#6E5C2E] items-center justify-center mr-2.5">
            <LocalibLogo width={20} height={20} />
          </View>
          <Text className="text-xl font-poppins-semibold text-[#1E1C1A]">
            {title} 
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

      {/* search */}
      <View className="bg-[#D8C77A] px-5 pt-4 pb-5 rounded-b-[28px] z-10">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={onMenuPress}
            activeOpacity={0.8}
            className="w-12 h-12 rounded-2xl bg-[#FAF9F5] items-center justify-center shadow-sm"
          >
            <Ionicons name="menu-outline" size={24} color="#2E2B27" />
          </TouchableOpacity>

          {isSearchInput ? (
            /* mode b */
            <View className="flex-1 flex-row items-center bg-[#FAF9F5] rounded-full px-4 h-12 shadow-sm">
              <TextInput
                value={searchValue}
                onChangeText={onChangeSearch}
                onSubmitEditing={onSubmitSearch}
                returnKeyType="search"
                placeholder="Search in Localib..."
                placeholderTextColor="#8C867E"
                className="flex-1 text-sm text-[#1E1C1A]"
              />

              {searchValue.length > 0 && (
                <TouchableOpacity
                  onPress={onClearSearch}
                  activeOpacity={0.7}
                  className="p-1 mr-1"
                >
                  <Ionicons name="close-circle" size={18} color="#9A948B" />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={onSubmitSearch}
                activeOpacity={0.8}
                className="w-8 h-8 rounded-full bg-[#5A4A28] items-center justify-center"
              >
                <Ionicons name="search" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ) : (
            /* mode a */
            <Pressable
              onPress={onSearchBarPress}
              className="flex-1 flex-row items-center bg-[#FAF9F5] rounded-full px-4 h-12 shadow-sm"
            >
              <Ionicons name="search-outline" size={20} color="#8C867E" />
              <Text className="flex-1 text-sm text-[#8C867E] ml-2.5">
                Search in Localib...
              </Text>
            </Pressable>
          )}
        </View>

        {/* {showFilterPills && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
            className="mt-4"
          >
            {filterTabs.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <Pressable
                  key={tab}
                  onPress={() => onSelectTab?.(tab)}
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
        )} */}
      </View>
    </View>
  );
}