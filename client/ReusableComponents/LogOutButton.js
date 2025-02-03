import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutButton = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem('userName');
            setUsername(storedUser); // Set the username in state
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userName'); // Remove username from storage
        setUsername(null); // Clear username in state
        navigation.navigate('LOGIN'); // Navigate to login screen
    };

    console.log(username, "user"); // Now username will display correctly

    return (
        <TouchableOpacity onPress={handleLogout} style={{ padding: 10, backgroundColor: 'red' }}>
            <Text style={{ color: 'white' }}>Logout</Text>
        </TouchableOpacity>
    );
};

export default LogoutButton;
