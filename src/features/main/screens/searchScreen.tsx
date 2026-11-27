{/* VIBE CODED ALERT */}
{/* VIBE CODED ALERT */}
{/* VIBE CODED ALERT */}
{/* VIBE CODED ALERT */}
{/* VIBE CODED ALERT */}
{/* VIBE CODED ALERT */}


import React, { useMemo, useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopNavigation } from '../components/topNavigation';
import { BottomNavigation, MainTab } from '../components/bottomNavigation';
import { BookCard, BookItem } from '../components/books';
import exampleResponse from '../../../shared/data/exampleCategoryResponse.json';



interface SearchScreenProps {
  onSignOut?: () => void;
  onSelectBook?: (book: BookItem) => void;
  onNavigateTab?: (tab: MainTab) => void;
}

const RECENT_SEARCHES = ['Atomic Habits', 'Carl Sagan', 'History', 'Deep Work'];

export function SearchScreen({ onSignOut, onSelectBook, onNavigateTab }: SearchScreenProps) {
  const [currentTab, setCurrentTab] = useState('Search');

  // 1. Live text while user is typing (does NOT change results yet)
  const [inputText, setInputText] = useState('');

  // 2. Submitted search query (updates ONLY when Search icon or Keyboard Go is pressed)
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Flatten all books from exampleResponse.json so we can search across every category
  const allBooks: BookItem[] = useMemo(() => {
    return exampleResponse.flatMap((cat) =>
      cat.books.map((book) => ({
        id: String(book.id),
        title: book.title,
        author: book.author,
        category: cat.name,
        cover: book.cover_url ? { uri: book.cover_url } : undefined,
        isSaved: book.is_saved,
      }))
    );
  }, []);

  // Filter books ONLY using submittedQuery
  const searchResults = useMemo(() => {
    const cleanQuery = submittedQuery.trim().toLowerCase();
    if (!cleanQuery) return [];

    return allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(cleanQuery) ||
        book.author.toLowerCase().includes(cleanQuery) ||
        (book.category && book.category.toLowerCase().includes(cleanQuery))
    );
  }, [allBooks, submittedQuery]);

  // Runs when user taps the Search icon or presses Go/Search on the keyboard
  const handleSearchSubmit = (customTerm?: string) => {
    const finalQuery = (customTerm ?? inputText).trim();
    if (!finalQuery) return;

    if (customTerm) {
      setInputText(customTerm);
    }
    setSubmittedQuery(finalQuery);
    setHasSearched(true);
    Keyboard.dismiss();
  };

  const handleClearSearch = () => {
    setInputText('');
    setSubmittedQuery('');
    setHasSearched(false);
  };

  return (
    <View className="flex-1 bg-[#FAF9F5]">
      <StatusBar style="dark" />

        <TopNavigation
        onSignOut={onSignOut}
        isSearchInput={true}
        searchValue={inputText}
        onChangeSearch={setInputText}
        onSubmitSearch={() => handleSearchSubmit()}
        onClearSearch={handleClearSearch}
        showFilterPills={false}
      />


      {/* 3. Main Content Area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {!hasSearched ? (
          /* STATE A: Before pressing Search (Simple, clean filler so screen isn't empty) */
          <View className="px-5 mt-6">
            {/* Quick Suggestion Chips */}
            <Text className="text-sm font-poppins-bold text-[#1E1C1A] mb-3">
              Suggested Searches
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-7">
              {RECENT_SEARCHES.map((term) => (
                <Pressable
                  key={term}
                  onPress={() => handleSearchSubmit(term)}
                  className="flex-row items-center bg-[#F2EFE8] border border-[#E5DFD3] px-3.5 py-2 rounded-full"
                >
                  <Ionicons name="time-outline" size={14} color="#7A6532" />
                  <Text className="text-xs font-poppins-medium text-[#3B3731] ml-1.5">
                    {term}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Browse by Category Quick Cards */}
            <Text className="text-sm font-poppins-bold text-[#1E1C1A] mb-3">
              Browse Categories
            </Text>
            <View className="gap-2.5">
              {exampleResponse.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => handleSearchSubmit(cat.name)}
                  activeOpacity={0.75}
                  className="flex-row items-center justify-between bg-[#F4F1EA] border border-[#E6E0D4] px-4 py-3.5 rounded-2xl"
                >
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 rounded-full bg-[#D4AF37] mr-2.5" />
                    <Text className="text-sm font-poppins-medium text-[#1E1C1A]">
                      {cat.name}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-xs text-[#8C867E] mr-1">
                      {cat.books.length} books
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="#8C867E" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          /* STATE B: After pressing Search Icon or Keyboard Go Button */
          <View className="px-5 mt-6">
            {/* Result Heading */}
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-base font-poppins-medium text-[#5C5346] flex-1 pr-2">
                From your search{' '}
                <Text className="font-poppins-bold text-[#1E1C1A]">
                  "{submittedQuery}"
                </Text>
              </Text>

              <View className="bg-[#EFE9D5] px-2.5 py-1 rounded-full">
                <Text className="text-[11px] font-poppins-semibold text-[#7A6532]">
                  {searchResults.length}{' '}
                  {searchResults.length === 1 ? 'result' : 'results'}
                </Text>
              </View>
            </View>

            {/* Matching Books Grid OR Empty State */}
            {searchResults.length > 0 ? (
              <View className="flex-row flex-wrap justify-between">
                {searchResults.map((book) => (
                  <View key={book.id} className="w-[48%] mb-5 items-center">
                    <BookCard
                      book={book}
                      onPress={(selected) => {
                        onSelectBook?.(selected);
                        console.log('Selected searched book:', selected.title);
                      }}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <View className="h-56 rounded-2xl border border-dashed border-[#D6CFC2] bg-[#F4F1EA] items-center justify-center px-6 mt-2">
                <Ionicons name="book-outline" size={30} color="#9A948B" />
                <Text className="text-sm font-poppins-semibold text-[#3B3731] mt-2.5">
                  No matching books found
                </Text>
                <Text className="text-xs text-[#7A756D] text-center mt-1">
                  Try searching another title, author, or category.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* 4. Pinned Shared Bottom Navigation */}
      <BottomNavigation
        activeTab="Search"
        onTabPress={(tab) => onNavigateTab?.(tab)}
        onAiPress={() => console.log('AI Assistant tapped')}
      />
    </View>
  );
}