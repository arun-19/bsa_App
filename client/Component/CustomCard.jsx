import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeCards from './Punch';

const CustomCard = ({ title, onPress, openModel, closeModel, navigation }) => (
    <View style={styles.cardSection}>
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.cardTitle}>{title}</Text>
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
});
export default CustomCard;
