import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import TimeInput from './Inputs/inputs';
import CloseButtons from './Buttons/Buttons';

const { width, height } = Dimensions.get('window');
const Punch = ({ isOpen, onClose, Child, closeModel }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [inTime, setInTime] = useState('');
    const [outTime, setOutTime] = useState('');

    const handleInTimeChange = (time) => {
        setInTime(time);
    };

    const handleOutTimeChange = (time) => {
        setOutTime(time);
    };

    const handleSubmit = () => {
        closeModel();
    };
    return (
        <View style={styles.modal}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>Enter Time</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter In Time (HH:MM)"
                    value={inTime}
                    onChangeText={handleInTimeChange}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter Out Time (HH:MM)"
                    value={outTime}
                    onChangeText={handleOutTimeChange}
                    keyboardType="numeric"
                />
                <View style={styles.buttonsContainer}>

                    <Text style={styles.buttonText}>In</Text>
                    <TimeInput />
                    <Text style={styles.buttonText}>Out</Text>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

                <CloseButtons closeModel={closeModel} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.8,
        height: height * 0.4,
    },
    modalText: {
        fontSize: 18,
        color: '#000',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 15,
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        fontSize: 16,
    },
    closeText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        width: '80%',
        marginTop: 20,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 10,
    },
});

export default Punch;
