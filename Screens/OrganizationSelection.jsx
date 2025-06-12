import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeArea } from '../Utilities/hooks/useSafeArea'

// Recently used organizations (subset of main list)
const recentOrgs = [
  {
    id: '1',
    name: 'Manchester City FC',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&h=80&fit=crop&crop=center',
    members: 1250,
    category: 'Football'
  },
  {
    id: '2',
    name: 'Barcelona FC',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=80&h=80&fit=crop&crop=center',
    members: 890,
    category: 'Football'
  },
  {
    id: '3',
    name: 'Tennis Academy Pro',
    logo: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=80&h=80&fit=crop&crop=center',
    members: 450,
    category: 'Tennis'
  },
  {
    id: '4',
    name: 'Golf Club Premium',
    logo: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=80&h=80&fit=crop&crop=center',
    members: 285,
    category: 'Golf'
  },
  {
    id: '5',
    name: 'Golf Club Premium',
    logo: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=80&h=80&fit=crop&crop=center',
    members: 285,
    category: 'Golf'
  },
  {
    id: '6',
    name: 'Golf Club Premium',
    logo: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=80&h=80&fit=crop&crop=center',
    members: 285,
    category: 'Golf'
  },
];

// Full organizations list
const organizations = [
  {
    id: '1',
    name: 'Manchester City FC',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&h=80&fit=crop&crop=center',
    members: 1250,
    category: 'Football'
  },
  {
    id: '2',
    name: 'Barcelona FC',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=80&h=80&fit=crop&crop=center',
    members: 890,
    category: 'Football'
  },
  {
    id: '3',
    name: 'Tennis Academy Pro',
    logo: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=80&h=80&fit=crop&crop=center',
    members: 450,
    category: 'Tennis'
  },
  {
    id: '4',
    name: 'Lakers Basketball',
    logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=80&h=80&fit=crop&crop=center',
    members: 320,
    category: 'Basketball'
  },
  {
    id: '5',
    name: 'Swimming Club Elite',
    logo: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=80&h=80&fit=crop&crop=center',
    members: 680,
    category: 'Swimming'
  },
  {
    id: '6',
    name: 'Volleyball Stars',
    logo: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=80&h=80&fit=crop&crop=center',
    members: 150,
    category: 'Volleyball'
  },
  {
    id: '7',
    name: 'Golf Club Premium',
    logo: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=80&h=80&fit=crop&crop=center',
    members: 285,
    category: 'Golf'
  },
  {
    id: '8',
    name: 'Hockey League Pro',
    logo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop&crop=center',
    members: 410,
    category: 'Hockey'
  }
];

const OrganizationSelection = () => {
  const { styles: safeAreaStyles } = useSafeArea({
    top: false,
    bottom: true,
    backgroundColor: 'white',
  });

  return (
    <View style={safeAreaStyles.container} className="bg-surface-primary">
      <ScrollView className="flex-1">
        {/* Header with gradient background */}
        <LinearGradient
          colors={['#2365E2', '#1C8FE7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="p-6"
          style={safeAreaStyles.topInset} // Add top safe area padding to gradient
        >
          <Text className="text-2xl font-bold text-text-inverse mb-2">
            Välj din organisation
          </Text>
          <Text className="text-text-inverse text-md mb-4">
            Logga in till rätt förening för att hantera aktiviteter och medlemskap.
          </Text>
          
          {/* Search Input */}
          <View className="flex-row items-center bg-white rounded-lg px-4 py-2">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2 text-text-body"
              placeholder="Sök organisation..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </LinearGradient>

        {/* Recent Organizations */}
        <View className="px-6 mt-6">
          <Text className="text-md text-text-subtitle tracking-wider mb-4">
            Senast använda
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="mb-6"
          >
            {recentOrgs.map((org) => (
              <TouchableOpacity 
                key={org.id} 
                className="mr-6 items-center"
                activeOpacity={0.7}
              >
                <View className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-100">
                  <Image
                    source={{ uri: org.logo }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-sm text-text-title text-center max-w-[80px]" numberOfLines={1}>
                  {org.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Organizations List */}
        <View className="px-6">
          <Text className="text-md text-text-subtitle tracking-wider mb-2">
            Alla organisationer
          </Text>
          {organizations.map((org) => (
            <TouchableOpacity
              key={org.id}
              className="flex-row items-center py-4 border-b border-gray-200 active:bg-gray-50"
              activeOpacity={0.7}
            >
              <View className="w-14 h-14 rounded-full overflow-hidden mr-4 bg-gray-100">
                <Image
                  source={{ uri: org.logo }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1">
                <Text className="text-text-title font-medium">{org.name}</Text>
                <Text className="text-text-secondary text-sm">
                  {org.members} medlemmar • {org.category}
                </Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={24} 
                color="#9CA3AF" 
                className="ml-2"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Support Link */}
        <View className="px-6 pt-6 mt-4 mb-6 flex-row items-center justify-center">
          <Text className="text-text-secondary">
            Kan du inte hitta din organisation?{' '}
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-text-primary font-medium">
              Kontakta support
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrganizationSelection
