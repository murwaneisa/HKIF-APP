import React, { useState, useMemo } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeArea } from '../Utilities/hooks/useSafeArea'
import { useNavigation } from '@react-navigation/native'

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
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();
  
  const { styles: safeAreaStyles, topInset } = useSafeArea({
    top: false,
    bottom: true,
    backgroundColor: 'white',
  });

  // Handle organization selection
  const handleOrganizationSelect = (organization) => {
    // Navigate to login screen with selected organization
    navigation.navigate('Login', { 
      selectedOrganization: organization 
    });
  };

  // Filter organizations based on search term
  const filteredOrganizations = useMemo(() => {
    if (!searchTerm.trim()) return organizations;
    
    const searchTermLower = searchTerm.toLowerCase().trim();
    return organizations.filter(org => 
      org.name.toLowerCase().includes(searchTermLower) ||
      org.category.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm]);

  // Filter recent organizations based on search term
  const filteredRecentOrgs = useMemo(() => {
    if (!searchTerm.trim()) return recentOrgs;
    
    const searchTermLower = searchTerm.toLowerCase().trim();
    return recentOrgs.filter(org => 
      org.name.toLowerCase().includes(searchTermLower) ||
      org.category.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm]);

  return (
    <View style={safeAreaStyles.container} className="bg-surface-primary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with gradient background */}
        <LinearGradient
          colors={['#2365E2', '#1C8FE7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            safeAreaStyles.topInset,
            {
              paddingHorizontal: 24,
              paddingVertical: 24,
            }
          ]}
        >
          <Text className="text-2xl md:text-3xl font-bold text-text-inverse my-2 md:my-3">
            Välj din organisation
          </Text>
          <Text className="text-text-inverse text-md md:text-lg mb-4 md:mb-6">
            Logga in till rätt förening för att hantera aktiviteter och medlemskap.
          </Text>
          
          {/* Search Input */}
          <View className="flex-row items-center bg-white rounded-lg px-4 md:px-6 py-2 md:py-3">
            <Ionicons name="search" size={25} color="#9CA3AF" className="md:scale-110" />
            <TextInput
              className="flex-1 ml-2 md:ml-3 text-text-body md:text-lg"
              placeholder="Sök organisation..."
              placeholderTextColor="#9CA3AF"
              value={searchTerm}
              onChangeText={setSearchTerm}
              autoCapitalize="none"
              autoCorrect={false}
              style={{ minHeight: 40 }}
            />
            <View style={{ width: 40, alignItems: 'center', justifyContent: 'center' }}>
              {searchTerm.length > 0 && (
                <TouchableOpacity 
                  onPress={() => setSearchTerm('')}
                  className="p-2"
                >
                  <Ionicons name="close-circle" size={25} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </LinearGradient>

        {/* Recent Organizations - Only show if not searching or if there are matching results */}
        {(!searchTerm || filteredRecentOrgs.length > 0) && (
          <View className="px-6 md:px-8 mt-6 md:mt-8">
            <Text className="text-md md:text-lg text-text-subtitle tracking-wider mb-4 md:mb-6">
              Senast använda
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              className="mb-6 md:mb-8"
            >
              {filteredRecentOrgs.map((org) => (
                <TouchableOpacity 
                  key={org.id} 
                  className="mr-6 md:mr-8 items-center"
                  activeOpacity={0.7}
                  onPress={() => handleOrganizationSelect(org)}
                >
                  <View className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden mb-2 md:mb-3 bg-gray-100">
                    <Image
                      source={{ uri: org.logo }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                  <Text className="text-sm md:text-base text-text-title text-center max-w-[80px] md:max-w-[100px]" numberOfLines={1}>
                    {org.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Organizations List */}
        <View className="px-6 md:px-8">
          <Text className="text-md md:text-lg text-text-subtitle tracking-wider mb-2 md:mb-4">
            {searchTerm ? 'Sökresultat' : 'Alla organisationer'}
          </Text>
          
          {/* No results message */}
          {searchTerm && filteredOrganizations.length === 0 && (
            <View className="py-8 items-center">
              <Text className="text-text-secondary text-center">
                Inga organisationer hittades för "{searchTerm}"
              </Text>
            </View>
          )}

          {/* Organizations list */}
          {filteredOrganizations.map((org) => (
            <TouchableOpacity
              key={org.id}
              className="flex-row items-center py-4 md:py-5 border-b border-gray-200 active:bg-gray-50"
              activeOpacity={0.7}
              onPress={() => handleOrganizationSelect(org)}
            >
              <View className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden mr-4 md:mr-6 bg-gray-100">
                <Image
                  source={{ uri: org.logo }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1">
                <Text className="text-text-title font-medium md:text-lg">{org.name}</Text>
                <Text className="text-text-secondary text-sm md:text-base">
                  {org.members} medlemmar • {org.category}
                </Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={24} 
                color="#9CA3AF" 
                className="ml-2 md:ml-3 md:scale-110"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Support Link - Only show if no search or no results */}
        {(!searchTerm || filteredOrganizations.length === 0) && (
          <View className="px-6 md:px-8 pt-6 md:pt-8 mt-4 mb-6 md:mb-8 flex-row items-center justify-center">
            <Text className="text-text-secondary md:text-lg">
              Kan du inte hitta din organisation?{' '}
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-text-primary font-medium md:text-lg">
                Kontakta support
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OrganizationSelection
