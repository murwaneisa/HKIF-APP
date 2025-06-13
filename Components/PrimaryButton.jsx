import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PrimaryButton = ({ 
  onPress, 
  disabled = false, 
  isLoading = false, 
  loadingText = "Loading...",
  children,
  className = "",
  height = 48, // default height for mobile
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      className={`w-full ${className}`}
    >
      <LinearGradient
        colors={disabled ? ['#9CA3AF', '#9CA3AF'] : ['#2365E2', '#1C8FE7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className={`
          w-full rounded-xl
          items-center justify-center
          shadow-lg shadow-black/20
        `}
        style={{ height }}
      >
        {isLoading ? (
          <View className="flex-row items-center space-x-2">
            <ActivityIndicator size="small" color="white" />
            <Text className="text-white font-semibold ml-2">
              {loadingText}
            </Text>
          </View>
        ) : (
          <Text className="text-white font-semibold text-base">
            {children}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PrimaryButton; 