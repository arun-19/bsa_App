import React from 'react'
import { Text } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';

const CloseButtons = ({ closeModel }) => {
    return (
        <TouchableOpacity style={styles.closeButton} onPress={closeModel}>
            <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

    closeText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 10,

    },

});
export default CloseButtons
