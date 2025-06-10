import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Badge = ({ children }) => {
  let iconsName;
  if (children === 'Full Membership') {
    iconsName = 'crown';
  } else if (children === 'Member') {
    iconsName = 'medal';
  }

  return (
    <View className="flex-row items-center justify-center bg-[#D1F5FF] border-2 border-white px-2.5 py-1 rounded-2xl">
      <View className="w-6 h-6 mr-1 flex-row items-center justify-center">
        {children === 'Not Member' ? (
          <FontAwesome5 name="sad-tear" size={24} color="black" />
        ) : (
          <MaterialCommunityIcons name={iconsName} size={24} color="#FFB743" />
        )}
      </View>
      <Text className="font-bold text-xs ml-1 text-text-primary font-['Inter-SemiBold']">
        {children}
      </Text>
    </View>
  );
};

export default Badge;
