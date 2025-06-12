import React, { useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontLoadContext } from '../Styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    withDelay,
} from 'react-native-reanimated';

const Splash = ({ navigation }) => {
    const fontsLoaded = useContext(FontLoadContext);

    useEffect(() => {
        if (fontsLoaded) {
            const timer = setTimeout(() => {
                navigation.navigate('Organizations');
            }, 5000); // 5 seconds

            return () => clearTimeout(timer);
        }
    }, [fontsLoaded, navigation]);

    const Dot = ({ delay }) => {
        const opacity = useSharedValue(0.5);
        const translateY = useSharedValue(0);

        const animatedStyle = useAnimatedStyle(() => {
            return {
                opacity: opacity.value,
                transform: [{ translateY: translateY.value }],
            };
        });

        useEffect(() => {
            translateY.value = withDelay(
                delay,
                withRepeat(
                    withSequence(
                        withTiming(-10, { duration: 400 }),
                        withTiming(0, { duration: 400 })
                    ),
                    -1,
                    true
                )
            );
        }, []);

        return <Animated.View style={[styles.dot, animatedStyle]} />;
    };

    return (
        <LinearGradient
            colors={['#1C8FE7', '#0FB4EC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={styles.circle3} />
            <View style={styles.circle4} />

            <View style={styles.logoContainer}>
                <Image
                    source={require('../Assets/images/sports_icon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.title}>IdrottHub</Text>
            <Text style={styles.subtitle}>
                Connect with your sports organization and stay active
            </Text>

            <View style={styles.dotsContainer}>
                <Dot delay={0} />
                <Dot delay={200} />
                <Dot delay={400} />
            </View>

            <Text style={styles.footer}>Powered by IdrottHub</Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle1: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        top: -50,
        left: -50,
    },
    circle2: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        top: 100,
        right: -75,
    },
    circle3: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        bottom: 50,
        left: -50,
    },
    circle4: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        bottom: -60,
        right: -60,
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: '70%',
        height: '70%',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'System', // Replace with your font if you have one
    },
    subtitle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 40,
        fontFamily: 'System', // Replace with your font
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginHorizontal: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        fontSize: 14,
        color: 'white',
        fontFamily: 'System', // Replace with your font
    },
});

export default Splash;
