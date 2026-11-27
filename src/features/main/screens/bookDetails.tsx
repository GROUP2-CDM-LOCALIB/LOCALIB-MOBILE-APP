import React, { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  Share,
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

// Extends your existing BookItem with optional details fields for when the database sends them
export interface DetailedBookItem extends BookItem {
  yearPublished?: string;
  languages?: string;
  translator?: string;
  synopsis?: string;
  tags?: string[];
  status?: string;
}

interface BookDetailsProps {
  book: DetailedBookItem;
  onBack?: () => void;
  onSignOut?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateTab?: (tab: MainTab) => void;
  onSelectBook?: (book: BookItem) => void;
  onExploreShelf?: (categoryName: string, books: BookItem[]) => void;
}

export function BookDetails({
  book,
  onBack,
  onSignOut,
  onNavigateToSearch,
  onNavigateTab,
  onSelectBook,
  onExploreShelf,
}: BookDetailsProps) {
  const [isSaved, setIsSaved] = useState(Boolean(book.isSaved));
  const [isExpanded, setIsExpanded] = useState(false);

  // Pull companion books from the same category in exampleCategoryResponse.json
  const sameShelfBooks: BookItem[] = useMemo(() => {
    const matchedCategory = exampleResponse.find(
      (cat) => cat.name === book.category
    );

    if (!matchedCategory) return [];

    return matchedCategory.books
      .filter((item) => String(item.id) !== book.id)
      .map((item) => ({
        id: String(item.id),
        title: item.title,
        author: item.author,
        category: matchedCategory.name,
        cover: item.cover_url ? { uri: item.cover_url } : undefined,
        isSaved: item.is_saved,
      }));
  }, [book.id, book.category]);

  // Fallback details until your database includes full metadata fields
  const synopsisText =
    book.synopsis ||
    `Explore "${book.title}" by ${book.author} in the Localib Digital Library Archive. Available for instant online reading or offline ePub access for registered students.`;

  const genreTags = book.tags || [
    book.category || 'General Archive',
    'Digital Edition',
    'Localib Curated',
  ];



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
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 1. Sub-Header Bar (Back Button, Archive Subtitle, Share & Bookmark) */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.75}
            className="w-10 h-10 rounded-full bg-[#EFECE3] items-center justify-center"
          >
            <Ionicons name="arrow-back" size={18} color="#3B3731" />
          </TouchableOpacity>

          <View className="items-center flex-1 px-3">
            <Text className="text-[10px] font-poppins-semibold tracking-widest text-[#8C867E] uppercase">
              Digital Library Archive
            </Text>
            <Text
              numberOfLines={1}
              className="text-xs font-poppins-semibold text-[#1E1C1A] mt-0.5"
            >
              {book.category || 'Localib Collection'}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => setIsSaved((prev) => !prev)}
              activeOpacity={0.75}
              className="w-10 h-10 rounded-full bg-[#EFECE3] items-center justify-center"
            >
              <Ionicons
                name={isSaved ? 'bookmark' : 'bookmark-outline'}
                size={18}
                color={isSaved ? '#D4AF37' : '#3B3731'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Centered Book Cover with Gold Ribbon */}
        <View className="items-center mt-4 px-5">
          <View className="w-44 h-64 rounded-2xl bg-[#EAE5DC] overflow-hidden shadow-md border border-[#E2DDD3] relative">
            {book.cover ? (
              <Image
                source={book.cover}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="flex-1 items-center justify-center px-4 bg-[#EFECE3]">
                <Ionicons name="book-outline" size={40} color="#8C867E" />
                <Text
                  numberOfLines={3}
                  className="text-xs font-poppins-medium text-[#7A756D] text-center mt-2"
                >
                  {book.title}
                </Text>
              </View>
            )}

            {/* Gold Top Ribbon */}
            {isSaved && (
              <View className="absolute top-0 left-4 w-5 h-9 bg-[#D4AF37] rounded-b-md items-center justify-end pb-1.5 shadow-sm">
                <View className="w-1.5 h-1.5 rounded-full bg-[#FAF9F5]" />
              </View>
            )}
          </View>

          {/* Book Title & Author */}
          <Text className="text-2xl font-poppins-bold text-[#1E1C1A] text-center mt-5">
            {book.title}
          </Text>

          <Text className="text-xs font-poppins-medium text-[#7A756D] text-center mt-1">
            {book.author}
            {book.translator ? `  •  Trans. ${book.translator}` : ''}
          </Text>
        </View>

        {/* 3. Metadata Boxes (Year Published & Languages) */}
        <View className="flex-row gap-3 px-5 mt-5">
          <View className="flex-1 bg-[#F4F1EA] border border-[#E6E0D4] rounded-2xl py-3 px-3 items-center">
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={14} color="#B8962E" />
              <Text className="text-xs font-poppins-bold text-[#1E1C1A] ml-1.5">
                {book.yearPublished || '2024'}
              </Text>
            </View>
            <Text className="text-[10px] font-poppins-regular text-[#8C867E] mt-0.5">
              Year Published
            </Text>
          </View>

          <View className="flex-1 bg-[#F4F1EA] border border-[#E6E0D4] rounded-2xl py-3 px-3 items-center">
            <View className="flex-row items-center">
              <Ionicons name="language-outline" size={14} color="#B8962E" />
              <Text className="text-xs font-poppins-bold text-[#1E1C1A] ml-1.5">
                {book.languages || 'EN / FIL'}
              </Text>
            </View>
            <Text className="text-[10px] font-poppins-regular text-[#8C867E] mt-0.5">
              Languages
            </Text>
          </View>
        </View>

        {/* 4. Primary Action Buttons (Read Online, Download ePub, Add to List) */}
        <View className="flex-row items-center gap-2.5 px-5 mt-5">
          <TouchableOpacity
            onPress={() => console.log('Read Online:', book.title)}
            activeOpacity={0.85}
            className="flex-1 flex-row items-center justify-center bg-[#1E1C1A] h-12 rounded-2xl px-3"
          >
            <Ionicons name="book-outline" size={16} color="#D4AF37" />
            <Text className="text-xs font-poppins-semibold text-white ml-2">
              Read Online
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log('Download ePub:', book.title)}
            activeOpacity={0.85}
            className="flex-1 flex-row items-center justify-center bg-[#F4F1EA] border border-[#E2DDD3] h-12 rounded-2xl px-3"
          >
            <Ionicons name="arrow-down-circle-outline" size={17} color="#3B3731" />
            <Text className="text-xs font-poppins-semibold text-[#1E1C1A] ml-1.5">
              Download ePub
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsSaved((prev) => !prev)}
            activeOpacity={0.85}
            className="w-12 h-12 rounded-2xl bg-[#F4F1EA] border border-[#E2DDD3] items-center justify-center"
          >
            <Ionicons
              name={isSaved ? 'checkmark' : 'add'}
              size={20}
              color="#3B3731"
            />
          </TouchableOpacity>
        </View>

        {/* 5. About the Work Card */}
        <View className="px-5 mt-7">
          <View className="flex-row items-center justify-between mb-2.5">
            <Text className="text-base font-poppins-bold text-[#1E1C1A]">
              About the Work
            </Text>
            <Text className="text-[10px] font-poppins-semibold tracking-wider text-[#8C867E] uppercase">
              Catalogue Entry
            </Text>
          </View>

          <View className="bg-[#F4F1EA] border border-[#E6E0D4] rounded-2xl p-4">
            <Text
              numberOfLines={isExpanded ? undefined : 3}
              className="text-xs font-poppins-regular text-[#4A453E] leading-5"
            >
              {synopsisText}
            </Text>

            <TouchableOpacity
              onPress={() => setIsExpanded((prev) => !prev)}
              activeOpacity={0.7}
              className="flex-row items-center mt-2"
            >
              <Text className="text-xs font-poppins-semibold text-[#8C6D1F]">
                {isExpanded ? 'Show less' : 'Read more'}
              </Text>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={14}
                color="#8C6D1F"
                style={{ marginLeft: 3 }}
              />
            </TouchableOpacity>

            {/* Genre / Topic Pills */}
            <View className="flex-row flex-wrap gap-2 mt-4">
              {genreTags.map((tag, index) => (
                <View
                  key={tag}
                  className={`px-3 py-1 rounded-full ${
                    index === genreTags.length - 1
                      ? 'bg-[#EFE6C8]'
                      : 'bg-[#EAE5DC]'
                  }`}
                >
                  <Text
                    className={`text-[11px] font-poppins-medium ${
                      index === genreTags.length - 1
                        ? 'text-[#7A6532]'
                        : 'text-[#5C5346]'
                    }`}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 6. From the Same Shelves */}
        {sameShelfBooks.length > 0 && (
          <View className="px-5 mt-7">
            <View className="flex-row items-center justify-between mb-3.5">
              <View className="flex-1 pr-2">
                <Text className="text-base font-poppins-bold text-[#1E1C1A]">
                  From the Same Shelves
                </Text>
                <Text className="text-[11px] font-poppins-regular text-[#8C867E]">
                  More works in {book.category}
                </Text>
              </View>

              {book.category && onExploreShelf && (
                <TouchableOpacity
                  onPress={() => onExploreShelf(book.category!, sameShelfBooks)}
                  activeOpacity={0.7}
                >
                  <Text className="text-xs font-poppins-semibold text-[#8C6D1F]">
                    Explore Shelf
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {sameShelfBooks.map((relatedBook) => (
                <BookCard
                  key={relatedBook.id}
                  book={relatedBook}
                  onPress={(selected) => onSelectBook?.(selected)}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Shared Bottom Navigation */}
      <BottomNavigation
        activeTab="Explore"
        onTabPress={(tab) => onNavigateTab?.(tab)}
        onAiPress={() => console.log('AI Assistant tapped')}
      />
    </View>
  );
}