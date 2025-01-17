import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLoginUserMutation } from '../redux/service/user'; // Assuming RTK query
import AsyncStorage from '@react-native-async-storage/async-storage';
function LoginScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loginUser, { isLoading }] = useLoginUserMutation();

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
            console.log("Sending login request with:", { username, password });
            const data = await loginUser({ username, password }).unwrap();
            console.log(data);
            if (data.message === "Login Successfull") {
                await AsyncStorage.setItem('userName', username);
                navigation.navigate('Approval');
            } else {
                setError('Login failed, please try again.');
            }
        } catch (error) {
            setError(error.data ? error.data.message : error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.title}
                source={require('../assets/pin.a0917c99.png')}
            />
            <Text style={styles.header}>Login</Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title={isLoading ? 'Loading...' : 'Login'}
                onPress={handleLogin}
                disabled={isLoading}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        position: 'absolute',
        top: 20,
        left: 0,
        width: "50%",
        height: 70,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
