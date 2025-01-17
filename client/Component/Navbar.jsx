import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();



export default function NavBar({ navigation }) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>App Title</Text>
            <TouchableOpacity onPress={() => alert('User Icon clicked!')}>
                <Icon name="user" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#3b82f6',
    },
    headerTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});
