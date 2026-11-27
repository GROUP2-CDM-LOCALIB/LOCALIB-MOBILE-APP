import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface BookItem {
  id: string;
  title: string;
  author: string;
  category?: string;
  cover?: ImageSourcePropType;
  isSaved?: boolean;
}

interface BookCardProps {
  book: BookItem;
  onPress?: (book: BookItem) => void;
  onToggleSave?: (book: BookItem) => void;
}

export function BookCard({ book, onPress, onToggleSave }: BookCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress?.(book)}
      activeOpacity={0.85}
      className="w-32 mr-3.5"
    >

      <View className="w-32 h-44 rounded-2xl bg-[#EAE5DC] overflow-hidden shadow-sm relative border border-[#E2DDD3]">
        {book.cover ? ( // may image ba
          <Image
            source={book.cover}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : ( // wala eh

          <View className="flex-1 items-center justify-center px-2 bg-[#EFECE3]">
            <Ionicons name="book-outline" size={28} color="#8C867E" />
            <Text
              numberOfLines={2}
              className="text-[10px] font-poppins-medium text-[#7A756D] text-center mt-1.5"
            >
              {book.title}
            </Text>
          </View>
        )}


        {book.isSaved && ( // save ba? lagyan bm
          <TouchableOpacity
            onPress={() => onToggleSave?.(book)}
            activeOpacity={0.8}
            className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-[#FAF9F5]/95 items-center justify-center shadow-sm"
          >
            <Ionicons name="bookmark" size={14} color="#D4AF37" />
          </TouchableOpacity>
        )}
      </View>


      <Text
        numberOfLines={1}
        className="text-xs font-poppins-bold text-[#1E1C1A] mt-2"
      >
        {book.title}
      </Text>


      <Text
        numberOfLines={1}
        className="text-[11px] font-poppins-regular text-[#7A756D] mt-0.5"
      >
        {book.author}
      </Text>
    </TouchableOpacity>
  );
}