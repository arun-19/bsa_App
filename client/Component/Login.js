import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    Image,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLoginUserMutation } from '../redux/service/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur'; // For glassy effect

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in animation

    React.useEffect(() => {
        // Fade-in animation when the component mounts
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,

            useNativeDriver: true,
        }).start();
    }, []);

    const validateInputs = () => {
        if (!username || !password) {
            Alert.alert('Validation Error', 'Username and password are required');
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setError(null);
        if (!validateInputs()) return;
        try {
            console.log('Sending login request with:', { username, password });
            const data = await loginUser({ username, password }).unwrap();
            console.log(data);
            if (data.message === 'Login Successfull') {
                await AsyncStorage.setItem('userName', username);
                navigation.navigate('HOME');
            } else {
                setError('Login failed, please try again.');
            }
        } catch (error) {
            setError(error.data ? error.data.message : error.message);
        }
    };

    return (
        <LinearGradient
            colors={['#6a11cb', '#2575fc']} // Gradient background
            style={styles.container}
        >
            <Image
                style={styles.logo}
                source={require('./img/bharani-small.png')}
            />
            <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
                {/* Glassy Effect */}
                <BlurView intensity={20} tint="light" style={styles.glassCard}>


                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#999"
                        value={username}
                        onChangeText={setUsername}
                        keyboardType="default"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Login'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>
                </BlurView>
            </Animated.View>

            {/* Footer with Light Gradient */}
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.2)']} // Light gradient
                style={styles.footer}
            >
                <Text style={styles.footerText}>Pinnacle Systems - All rights reserved.</Text>
            </LinearGradient>

            <StatusBar style="light" />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    card: {
        width: '90%',
        maxWidth: 400,
        borderRadius: 20,
        overflow: 'hidden', // Ensures the blur effect doesn't overflow
    },
    glassCard: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    },
    logo: {
        width: 160,
        height: 70,
        marginBottom: 20,
        alignSelf: 'center',
        resizeMode: 'contain',
        backgroundColor: 'white',
        paddingHorizontal: 100,
        borderRadius: 5

    },
    input: {
        width: '100%',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: 'rgba(205, 255, 255, 0.8)', // Semi-transparent input background
        color: '#333',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6a11cb',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupText: {
        marginTop: 15,
        color: '#6a11cb',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default LoginScreen;