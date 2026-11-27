import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type MainTab = 'Explore' | 'Search' | 'Read' | 'Profile';

interface BottomNavProps {
  activeTab: MainTab;
  onTabPress: (tab: MainTab) => void;
  onAiPress?: () => void;
  showFloatingButton?: boolean;
}

const NAV_ITEMS: {
  name: MainTab;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;  }[] = [
    { name: 'Explore', activeIcon: 'compass', inactiveIcon: 'compass-outline' },
    { name: 'Search', activeIcon: 'search', inactiveIcon: 'search-outline' },
    { name: 'Read', activeIcon: 'book', inactiveIcon: 'book-outline' },
    { name: 'Profile', activeIcon: 'person', inactiveIcon: 'person-outline' },
];

export function BottomNavigation({
  activeTab,
  onTabPress,
  onAiPress,
  showFloatingButton = true,
}: BottomNavProps) {
  return (

    <View className="bg-[#FAF9F5] border-t border-[#ECE7DC]">

      {showFloatingButton && (
        <TouchableOpacity
          onPress={onAiPress}
          activeOpacity={0.85}
          className="absolute -top-20 right-5 w-14 h-14 rounded-full bg-[#6E5C2E] items-center justify-center shadow-lg">
            <Ionicons name="sparkles-outline" size={24} color="#fff" />
        </TouchableOpacity>
      )}


      <View className="flex-row items-center justify-around pt-3 pb-6 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => onTabPress(item.name)}
              activeOpacity={0.7}
              className="flex-1 items-center justify-center py-1">

                <Ionicons
                    name={isActive ? item.activeIcon : item.inactiveIcon}
                    size={24}
                    color={isActive ? '#5A4A28' : '#8C867E'} />

                <Text
                        className={`text-xs mt-1 ${
                        isActive
                            ? 'font-poppins-semibold text-[#1E1C1A]'
                            : 'font-poppins-regular text-[#8C867E]'
                        }`}>

                        {item.name}
                </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}