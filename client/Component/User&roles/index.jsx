import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGetUserDetQuery, useGetUsersQuery } from '../../redux/service/user';
import UserCreation from './UserCreation';
import Form from './Form';
import NavBar from '../Navbar';
import { useCustomFonts } from '../CustomHooks/useFonts';
import CustomText from '../Text/CustomText';

export default function UserAndRoles() {
    const [role, setRole] = useState(true);
    const {fontsLoaded}=useCustomFonts()

    const { data: userDet } = useGetUserDetQuery();
    const handleCreateUserPress = () => setRole(true);
    const handleRolePress = () => setRole(false);

    return (<>
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, !role && styles.inactive]}
                    onPress={handleCreateUserPress}
                >
                    <CustomText style={styles.buttonText}>Allocate Role</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, role && styles.inactive]}
                    onPress={handleRolePress}
                >
                    <CustomText style={styles.buttonText}>Create User</CustomText>
                </TouchableOpacity>
            </View>

            {role ? (
                <UserCreation userDet={userDet} />
            ) : (
                <Form userDet={userDet} />
            )}
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 15,
    },
    button: {
        backgroundColor: '#3b82f6',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        marginBottom: 10,
        flex: 1,


        alignItems: 'center',
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: 'center',
        gap: 4,

    },
    inactive: {
        opacity: 0.8,
        backgroundColor: '#d2d4d6',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
    },
});
