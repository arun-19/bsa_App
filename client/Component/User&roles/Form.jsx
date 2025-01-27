import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, ScrollView } from "react-native";
import Toast from "react-native-toast-message";

import { useCreateUserMutation, useGetUserDetQuery } from "../../redux/service/user";
import tabs from "../tabIndex";
import { Dropdown } from "../../ReusableComponents/inputs";

const { width, height } = Dimensions.get('window');

const Form = ({ closeModal, onClose, userDet }) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [checkboxes, setCheckboxes] = useState({});
    const [selectedEmply, setSelectedEmply] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');

    const [createUser, { isLoading, isError, error }] = useCreateUserMutation();

    useEffect(() => {
        if (selectedEmply && userDet) {
            const selectedEmployee = userDet?.data?.find(item => item.id === selectedEmply);


            if (selectedEmployee) {
                setRole(selectedEmployee.role);
            } else {
                setRole("");
            }
        }
    }, [selectedEmply, userDet]);


    const handleCheckboxChange = (id) => {
        setCheckboxes((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const validateData = (data) => {

        if (data.username && data.password) {
            return true;
        }
        return false;
    };

    const handleSubmitCustom = async (callback, data, text) => {
        try {
            const response = await callback(data).unwrap();
            if (response.statusCode === 1) {
                console.log(`${response.message}`);
            } else {
                Toast.success(`${text} Successfully`);
            }
            onClose();
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // const selectedCheckboxes = tabs.filter(
        //     (checkbox) => checkboxes[checkbox.name]
        // ).map((checkbox) => ({ id: checkbox.name, label: checkbox.label }));
        const formData = { username, password, email, role };

        if (!validateData(formData)) {
            Toast.show({
                type: "info",
                text1: "Please fill all required fields...!",
            });
            return;
        }

        Alert.alert(
            "Confirmation",
            "Are you sure you want to save the details?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => handleSubmitCustom(createUser, formData, "User Created"),
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.formContainer}>
            <View style={styles.inputContainer}>
                <View >
                    <Dropdown
                        selected={selectedEmply}
                        label={<Text>Select Employee</Text>}
                        setSelected={setSelectedEmply}
                        options={userDet}
                    />
                    <View>
                        <Text style={styles.label}>Role:</Text>
                        <TextInput
                            value={role}
                            onChangeText={setRole}
                            style={styles.input}
                            placeholder="Role"
                            editable={false}
                        />
                    </View>
                </View>

                <Text style={styles.label}>UserName:</Text>
                <TextInput
                    value={username}
                    onChangeText={setUserName}
                    style={styles.input}
                    placeholder="Enter username"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                    placeholder="Enter password"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    secureTextEntry
                    placeholder="Enter email"
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    <Text style={styles.submitButtonText}>
                        {isLoading ? "Please Wait..." : "Save"}
                    </Text>
                </TouchableOpacity>
                {isError && <Text style={styles.errorMessage}>{error.message}</Text>}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
    },
    input: {
        height: 35,
        width: "80%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 16,
        color: "#333",
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    submitButton: {
        backgroundColor: "#3b82f6",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorMessage: {
        color: "red",
        fontSize: 14,
        marginTop: 10,
    },
});

export default Form;
