import React, { useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { FontLoadContext } from '../Styles/theme';

const Splash = ({ navigation }) => {
  const fontsLoaded = useContext(FontLoadContext);

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        navigation.navigate('Welcome');
      }, 300000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, navigation]);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <View className="w-[70%] aspect-square">
        <Image
          source={require('../Assets/images/icon.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
      <Text className="text-text-primary mt-5 text-2xl font-bold text-center">
        Högskolan Kristianstads idrottsförening
      </Text>
    </View>
  );
};

export default Splash;
