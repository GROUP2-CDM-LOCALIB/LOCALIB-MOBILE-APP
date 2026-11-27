import React, { useEffect, useState } from 'react';
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
import { BookCard, BookItem } from '../components/books';
import exampleResponse from '../../../shared/data/exampleCategoryResponse.json';
import { getBook } from '../api';




interface DashboardScreenProps {
  onSignOut?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateTab?: (tab: MainTab) => void;
  onSelectCategory?: (categoryName: string, books: BookItem[]) => void;
  onSelectBook?: (book: BookItem) => void;
}

interface CategorySection {
  id: string;
  name: string;
  books: BookItem[];
}



export function DashboardScreen({
  onSignOut,
  onNavigateToSearch,
  onNavigateTab,
  onSelectCategory,
  onSelectBook,
}: DashboardScreenProps) {
  const [activeFilterTab, setActiveFilterTab] = useState('All Shelves');
  const [categories, setCategories] = useState<CategorySection[]>([]);

  useEffect(() => {
    async function load() {
      console.log('dsf');
      await getBook();
    }

    // load()

    const formattedCategories: CategorySection[] = exampleResponse.map((cat) => ({
      id: String(cat.id),
      name: cat.name,
      books: cat.books.map((book) => ({
        id: String(book.id),
        title: book.title,
        author: book.author,
        category: cat.name,
        cover: book.cover_url ? { uri: book.cover_url } : undefined,
        isSaved: book.is_saved,
      })),
    }));

    setCategories(formattedCategories);
  }, []);

  const savedBooks = categories.flatMap((cat) =>
    cat.books.filter((book) => book.isSaved)
  );

  const curatedPicks = categories.flatMap((cat) => cat.books).slice(0, 4);


  return (
    <View className="flex-1 bg-[#FAF9F5]">
      <StatusBar style="dark" />

      {/* Top Navigation */}
      <TopNavigation
        onSignOut={onSignOut}
        onSearchBarPress={onNavigateToSearch}
        activeTab={activeFilterTab}
        onSelectTab={setActiveFilterTab}
      />

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* 1. Saved Books */}
        <View className="pl-5 pr-0 mt-6">
          <View className="flex-row items-center justify-between mb-3.5">
            <View className="flex-row items-center">
              <Text className="text-lg font-poppins-bold text-[#1E1C1A]">
                Saved Books
              </Text>
              <View className="bg-[#EFE9D5] px-2.5 py-0.5 rounded-full ml-2.5">
                <Text className="text-[11px] font-poppins-medium text-[#7A6532]">
                  {savedBooks.length} {savedBooks.length === 1 ? 'item' : 'items'}
                </Text>
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-xs font-poppins-medium text-[#7A756D]">
                Browse more ›
              </Text>
            </TouchableOpacity>
          </View>

          {savedBooks.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {savedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onPress={(selected) => onSelectBook?.(selected)}
                />
              ))}
            </ScrollView>
          ) : (
            <View className="h-48 rounded-2xl border border-dashed border-[#D6CFC2] bg-[#F4F1EA] items-center justify-center px-6">
              <Ionicons name="bookmarks-outline" size={26} color="#9A948B" />
              <Text className="text-xs font-poppins-medium text-[#7A756D] mt-2 text-center">
                No saved books yet
              </Text>
            </View>
          )}
        </View>

        {/* 2. Local Curation Picks (Wide Featured Cards to break up standard book rows) */}
        {curatedPicks.length > 0 && (
          <View className="mt-12">
            <View className="flex-row items-center px-5 mb-3.5">
              <View className="w-2 h-2 rounded-full bg-[#D4AF37] mr-2" />
              <Text className="text-lg font-poppins-bold text-[#1E1C1A]">
                Local Curation Picks
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
            >
              {curatedPicks.map((book, index) => {
                // Sample ratings until rating is added to your database JSON
                const sampleRatings = ['4.8', '4.6', '4.7', '4.5'];
                const rating = sampleRatings[index % sampleRatings.length];

                return (
                  <Pressable
                    key={book.id}
                    onPress={() => onSelectBook?.(book)}
                    className="w-[310px] flex-row bg-[#FFFFFF] border border-[#EAE5DC] rounded-3xl p-3.5 shadow-sm"
                  >
                    {/* Left Book Cover */}
                    <View className="w-24 h-36 rounded-2xl bg-[#EFECE3] overflow-hidden border border-[#E2DDD3]">
                      {book.cover ? (
                        <Image
                          source={book.cover}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                      ) : (
                        <View className="flex-1 items-center justify-center px-2">
                          <Ionicons name="book-outline" size={26} color="#8C867E" />
                          <Text
                            numberOfLines={2}
                            className="text-[9px] font-poppins-medium text-[#7A756D] text-center mt-1"
                          >
                            {book.title}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Right Book Details */}
                    <View className="flex-1 ml-3.5 justify-between">
                      <View>
                        {/* Uppercase Gold Category Label */}
                        <Text
                          numberOfLines={1}
                          className="text-[10px] font-poppins-semibold tracking-wider text-[#B8962E] uppercase"
                        >
                          {book.category || 'Featured Archive'}
                        </Text>

                        {/* Title */}
                        <Text
                          numberOfLines={1}
                          className="text-sm font-poppins-bold text-[#1E1C1A] mt-0.5"
                        >
                          {book.title}
                        </Text>

                        {/* Author */}
                        <Text
                          numberOfLines={1}
                          className="text-xs font-poppins-regular text-[#7A756D]"
                        >
                          {book.author}
                        </Text>

                        {/* Short Synopsis Snippet */}
                        <Text
                          numberOfLines={2}
                          className="text-[11px] font-poppins-regular text-[#5C5346] leading-4 mt-1.5"
                        >
                          A curated local library selection exploring key insights by {book.author}.
                        </Text>
                      </View>

                      {/* Bottom Divider + Rating & Explore Pill Button */}
                      <View className="flex-row items-center justify-between pt-2 mt-2 border-t border-[#F0ECE3]">

                        <TouchableOpacity
                          onPress={() => onSelectBook?.(book)}
                          activeOpacity={0.85}
                          className="bg-[#1E1C1A] px-4 py-1.5 rounded-full"
                        >
                          <Text className="text-[11px] font-poppins-semibold text-white">
                            Explore
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

            <View className="flex-row items-center my-5 mt-12">
              <View className="flex-1 h-[1px] bg-[#E2DDD3]" />
              <Text className="text-[11px] text-[#9A948B] mx-3">
                Categories
              </Text>
              <View className="flex-1 h-[1px] bg-[#E2DDD3]" />
            </View>


        {/* 3. Dynamic Categories */}
        {categories.map((category) => (
          <View key={category.id} className="pl-5 pr-0 py-5 mt-5">

            <View className="flex-row items-center justify-between mb-5">
              <Pressable
                onPress={() => onSelectCategory?.(category.name, category.books)}
                className="flex-row items-center flex-1 pr-2"
              >
                <View className="w-2 h-2 rounded-full bg-[#D4AF37] mr-2" />
                <Text className="text-lg font-poppins-bold text-[#1E1C1A]">
                  {category.name}
                </Text>
              </Pressable>

              <TouchableOpacity
                onPress={() => onSelectCategory?.(category.name, category.books)}
                activeOpacity={0.7}
              >
                <Text className="text-xs font-poppins-medium text-[#7A756D]">
                  Browse more ›
                </Text>
              </TouchableOpacity>
            </View>

            {category.books.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
              >
                {category.books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onPress={(selected) => onSelectBook?.(selected)}
                  />
                ))}
              </ScrollView>
            ) : (
              <View className="h-48 rounded-2xl border border-dashed border-[#D6CFC2] bg-[#F4F1EA] items-center justify-center px-6">
                <Ionicons name="library-outline" size={26} color="#9A948B" />
                <Text className="text-xs font-poppins-medium text-[#7A756D] mt-2 text-center">
                  No books in {category.name} yet
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="Explore"
        onTabPress={(tab) => onNavigateTab?.(tab)}
      />
    </View>
  );
}