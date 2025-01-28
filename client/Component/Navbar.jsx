import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NavBar() {
    const navigation = useNavigation(); // Use the hook to get the navigation object

    function handleNavigate() {
        navigation.navigate('USERANDROLES'); // Now it works as expected
    }

    return (
        <View style={styles.header}>
            <Image
                style={styles.title}
                source={require('./img/bharani-small.png')}
            />

            <TouchableOpacity onPress={handleNavigate}>
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
        paddingHorizontal: 10,
        backgroundColor: '#3b82f6',
        marginTop: 25,
    },
    headerTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    title: {
        width: 140,
        height: 35,
        margin: 2,
        alignSelf: 'center',
        resizeMode: 'contain',
        backgroundColor: "white",
        borderRadius: 5,
    },
});
