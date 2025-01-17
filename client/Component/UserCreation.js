import React, { useEffect, useState } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useGetUsersQuery } from '../../redux/service/user'; // Assuming Redux is set up for API calls
import Form from '../form'; // Assuming your Form component can be used in React Native

export default function UserCreation() {
    const [open, setOpen] = useState(false);
    const { data: userDt, refetch } = useGetUsersQuery();
    const userData = userDt?.data || [];

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        refetch();
    };

    useEffect(() => {
        refetch();
    }, [refetch]);

    const groupedUsers = userData.reduce((acc, user) => {
        if (!acc[user.userName]) {
            acc[user.userName] = {
                userName: user.userName,
                roles: [],
            };
        }
        if (user.role && !acc[user.userName].roles.includes(user.role)) {
            acc[user.userName].roles.push(user.role);
        }
        return acc;
    }, {});

    const uniqueRoles = [...new Set(userData.map(user => user.role).filter(role => role))];

    const renderItem = ({ item, index }) => (
        <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <Text style={styles.username}>{item.userName}</Text>
            {uniqueRoles.map((role, idx) => (
                <Text key={idx} style={styles.role}>
                    {item.roles.includes(role) ? '✓' : '-'}
                </Text>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>User Details</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleOpen}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={Object.values(groupedUsers)}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.table}
                ListHeaderComponent={
                    <View style={styles.headerRow}>
                        <Text style={styles.headerText}>Username</Text>
                        {uniqueRoles.map((role, index) => (
                            <Text key={index} style={styles.headerText}>{role}</Text>
                        ))}
                    </View>
                }
            />

            <Modal
                visible={open}
                onRequestClose={handleClose}
                transparent
                animationType="slide"
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContent}>
                        <Form onClose={handleClose} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#3b82f6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    table: {
        marginTop: 20,
    },
    headerRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#3b82f6',
    },
    headerText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    evenRow: {
        backgroundColor: '#f3f4f6',
    },
    oddRow: {
        backgroundColor: '#ffffff',
    },
    username: {
        flex: 1,
        fontSize: 16,
    },
    role: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
});
