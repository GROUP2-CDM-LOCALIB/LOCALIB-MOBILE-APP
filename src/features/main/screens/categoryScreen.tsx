import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopNavigation } from '../components/topNavigation';
import { BottomNavigation, MainTab } from '../components/bottomNavigation';
import { BookItem } from '../components/books';

type SortFilter = 'A-Z' | 'author' | 'saved';

interface CategoryScreenProps {
  categoryName: string;
  books: BookItem[];
  onBack?: () => void;
  onSignOut?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateTab?: (tab: MainTab) => void;
  onSelectBook?: (book: BookItem) => void;
}

export function CategoryScreen({
  categoryName,
  books,
  onBack,
  onSignOut,
  onNavigateToSearch,
  onNavigateTab,
  onSelectBook,
}: CategoryScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<SortFilter>('A-Z');

  // Filter and sort books based on the selected filter pill
  const displayedBooks = useMemo(() => {
    const list = [...books];

    if (selectedFilter === 'saved') {
      return list.filter((b) => b.isSaved);
    }

    if (selectedFilter === 'author') {
      return list.sort((a, b) => a.author.localeCompare(b.author));
    }

    // Default: 'A-Z' by title
    return list.sort((a, b) => a.title.localeCompare(b.title));
  }, [books, selectedFilter]);

  return (
    <View className="flex-1 bg-[#FAF9F5]">
      <StatusBar style="dark" />

      {/* Shared Top Navigation */}
      <TopNavigation
        onSignOut={onSignOut}
        onSearchBarPress={onNavigateToSearch}
        showFilterPills={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Back Button + Category Header & Filter Row */}
        <View className="px-5 mt-5">
          {/* Subtle Back to Explore link */}


          

          <View className="flex-row items-center">
              {onBack && (
            <TouchableOpacity
              onPress={onBack}
              activeOpacity={0.7}
              className="flex-row items-center self-start mb-2.5 rounded-full px-4 py-2.5 bg-[#EFECE3]/90"
            >
              <Ionicons name="arrow-back" size={16} color="#5A4A28" />
            </TouchableOpacity>
          )}
              <Text className="text-lg font-poppins-bold text-[#1E1C1A]">
                {categoryName}
              </Text>
              <View className="bg-[#EFE9D5] px-2.5 py-0.5 rounded-full ml-2">
                <Text className="text-[11px] font-poppins-medium text-[#7A6532]">
                  {displayedBooks.length}{' '}
                  {displayedBooks.length === 1 ? 'item' : 'items'}
                </Text>
              </View>
            </View>

          {/* Header Row: Category Name (items) on left, Filter By on right */}
          <View className="flex-row items-center justify-between flex-wrap gap-y-2 mb-4">

            {/* Left: Category Name + Item Count */}
            



            {/* Right: Filter By Pills */}
            <View className="flex-row items-center gap-1.5">
              <Text className="text-[11px] font-poppins-medium text-[#7A756D] mr-1">
                Filter by:
              </Text>

              {(['A-Z', 'author', 'saved'] as SortFilter[]).map((filter) => {
                const isActive = selectedFilter === filter;
                const label =
                  filter === 'A-Z'
                    ? 'A-Z'
                    : filter === 'author'
                    ? 'Author'
                    : 'Saved';

                return (
                  <Pressable
                    key={filter}
                    onPress={() => setSelectedFilter(filter)}
                    className={`px-2.5 py-1 rounded-full ${
                      isActive
                        ? 'bg-[#5A4A28]'
                        : 'bg-[#EFECE3] border border-[#E2DDD3]'
                    }`}
                  >
                    <Text
                      className={`text-[11px] font-poppins-medium ${
                        isActive ? 'text-white' : 'text-[#3B3731]'
                      }`}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* 3 Books Per Row Grid */}
          {displayedBooks.length > 0 ? (
            <View className="flex-row flex-wrap justify-start gap-x-[3.5%] gap-y-5">
              {displayedBooks.map((book) => (
                <TouchableOpacity
                  key={book.id}
                  onPress={() => onSelectBook?.(book)}
                  activeOpacity={0.85}
                  className="w-[31%]"
                >
                  {/* Cover Box */}
                  <View className="w-full h-44 rounded-2xl bg-[#EAE5DC] overflow-hidden shadow-sm relative border border-[#E2DDD3]">
                    {book.cover ? (
                      <Image
                        source={book.cover}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="flex-1 items-center justify-center px-2 bg-[#EFECE3]">
                        <Ionicons name="book-outline" size={24} color="#8C867E" />
                        <Text
                          numberOfLines={2}
                          className="text-[9px] font-poppins-medium text-[#7A756D] text-center mt-1"
                        >
                          {book.title}
                        </Text>
                      </View>
                    )}

                    {/* Bookmark Badge */}
                    {book.isSaved && (
                      <View className="absolute top-1.5 right-1.5 w-6 h-6 rounded-md bg-[#FAF9F5]/95 items-center justify-center shadow-sm">
                        <Ionicons name="bookmark" size={12} color="#D4AF37" />
                      </View>
                    )}
                  </View>

                  {/* Title */}
                  <Text
                    numberOfLines={1}
                    className="text-xs font-poppins-bold text-[#1E1C1A] mt-1.5"
                  >
                    {book.title}
                  </Text>

                  {/* Author */}
                  <Text
                    numberOfLines={1}
                    className="text-[10px] font-poppins-regular text-[#7A756D]"
                  >
                    {book.author}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="h-48 rounded-2xl border border-dashed border-[#D6CFC2] bg-[#F4F1EA] items-center justify-center px-6 mt-2">
              <Ionicons name="book-outline" size={28} color="#9A948B" />
              <Text className="text-xs font-poppins-medium text-[#7A756D] mt-2 text-center">
                No books found for this filter.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Shared Bottom Navigation */}
      <BottomNavigation
        activeTab="Explore"
        onTabPress={(tab) => onNavigateTab?.(tab)}
      />
    </View>
  );
}