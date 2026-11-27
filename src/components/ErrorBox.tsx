import { View, Text } from 'react-native';

type ErrorBoxParam = {
  message: string;
};

export default function ErrorBox({ message }: ErrorBoxParam) {
  return (
    <View className="bg-red-100 border border-red-400 rounded-lg p-3 mt-4">
      <Text className="text-red-700 text-xs font-poppins-medium">
        {message}
      </Text>
    </View>
  );
}