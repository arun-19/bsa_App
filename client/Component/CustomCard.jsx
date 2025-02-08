import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HomeCards from './Punch';

const CustomCard = ({ title, onPress, openModel, closeModel, navigation }) => (
    <View style={styles.cardSection}>
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Image
                source={require('./img/arrow-down-sign-to-navigate.png')}
                style={styles.cardImage}

            />

        </TouchableOpacity>

        {/* Conditionally render HomeCards based on openModel */}
        {openModel && (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <HomeCards openModel={openModel} closeModel={closeModel} navigation={navigation} />
                </View>
            </View>
        )}
    </View>
);

const styles = StyleSheet.create({
    cardSection: {
        marginBottom: 10, // Adjust bottom margin for each card
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 10, // Add space between the card content
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    cardContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardImage: {
        width: 10,
        height: 10,

    }
});
export default CustomCard;
