import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FloatingButton = ({ save }) => {
    const [showOptions, setShowOptions] = useState(false);

    // Actions menu for the floating button
    const actions = [
        {
            text: "New",
            name: "bt_add",  // You can use an icon or a unique name for the "New" action
            onPress: () => console.log("New action clicked"),  // This can be a handler for the "New" action
        },
        {
            text: "Save",
            name: "bt_save",
            onPress: save,  // Trigger the save function passed as a prop
        },
        {
            text: "Edit",
            name: "bt_edit",
            onPress: () => console.log("Edit action clicked"),  // Add your Edit functionality here
        },
        {
            text: "Delete",
            name: "bt_delete",
            onPress: () => console.log("Delete action clicked"),  // Add your Delete functionality here
        },
    ];

    // Toggle the options list visibility
    const handleButtonPress = () => {
        setShowOptions(!showOptions);
    };

    return (
        <View style={styles.container}>
            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fabBtn} onPress={handleButtonPress}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* Options List */}
            {showOptions && (
                <View style={styles.socialList}>
                    {actions.map((action) => (
                        <TouchableOpacity
                            key={action.name}
                            style={styles.socialItem}
                            onPress={action.onPress}  // Trigger the corresponding action
                        >
                            <Text>{action.text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',  // Position the FAB at the bottom right
        bottom: 20,
        right: 20,
        zIndex: 1000,  // To ensure it appears above other UI elements
    },
    fabBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6B26BB',
        borderRadius: 25,
        height: 50,
        width: 50,
    },
    fabText: {
        color: 'white',
        fontSize: 24,
    },
    socialList: {
        position: 'absolute',
        bottom: 60,
        left: -80,
        borderRadius: 10,
        width: 200,
        padding: 10,
        zIndex: 10,
        alignItems: 'center',
        flexDirection: 'column',
    },
    socialItem: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

export default FloatingButton;
