import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import { useCreateRoleOnPageMutation, useGetDesignationQuery, useGetRolesOnPageQuery, useGetUserDetQuery, useGetUsersQuery } from '../../redux/service/user';
import tabs from '../tabIndex';
import PullToRefresh from '../../ReusableComponents/PullToRefresh';
import { Dropdown } from '../../ReusableComponents/inputs';
import { Table, Row, Rows, Col } from "react-native-table-component";
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native-gesture-handler';
import FloatingButton from '../Buttons/Buttons';

export default function UserCreation() {
    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [permissions, setPermissions] = useState({});
    const [roleName, setRoleName] = useState(null);
    const { data: role, refetch } = useGetDesignationQuery();
    const { data: roleOnPage, refetch: userRefetch } = useGetRolesOnPageQuery({ params: { selectedRole: selectedRole } });
    console.log(roleOnPage, 'roleOnPage');

    function onNew() {
        setPermissions({})
        setSelectedRole(null)
    }

    const handleSubmitCustom = async (callback, data, text) => {
        try {
            const response = await callback(data).unwrap();
            if (response.statusCode === 1) {
                Toast.show({
                    type: 'success',
                    text1: `${text} Successfully`,
                });
            } else {
                onNew()
            }
            userRefetch()
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: `Error: ${error.message}`,
            });
        }
    };

    const userData = roleOnPage?.data || [];

    useEffect(() => {
        const transformedPermissions = userData.reduce((acc, permission) => {
            acc[permission.Pages] = {
                Read: Boolean(permission.Read),
                Create: Boolean(permission.Create),
                Update: Boolean(permission.Update),
                Delete: Boolean(permission.Delete),
                Admin: Boolean(permission.Admin),
            };
            return acc;
        }, {});

        setPermissions(transformedPermissions);
    }, [userData]);

    const [createUserOnRole] = useCreateRoleOnPageMutation();

    const tableHead = ["Pages", "Read", "Create", "Update", "Delete", "Admin"];

    const handlePermissionChange = (page, permission) => {
        setPermissions(prevState => {
            const updatedPermissions = { ...prevState };
            if (!updatedPermissions[page]) updatedPermissions[page] = {};

            if (permission === "Admin") {
                updatedPermissions[page] = {
                    Read: true,
                    Create: true,
                    Update: true,
                    Delete: true,
                    Admin: true,
                };
            } else {
                updatedPermissions[page][permission] = !updatedPermissions[page][permission];
                const allSelected = ['Read', 'Create', 'Update', 'Delete'].every(
                    (perm) => updatedPermissions[page][perm]
                );
                updatedPermissions[page].Admin = allSelected;
            }

            return updatedPermissions;
        });
    };

    const validateData = (data) => {
        if (data.roleName && data.permissions) {
            return true;
        }
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { permissions, roleName };

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
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => handleSubmitCustom(createUserOnRole, formData, "User Created") },
            ],
            { cancelable: false }
        );
    };

    const tableData = (tabs || []).map(item => {
        const permissionData = permissions[item.name] || {};

        return [
            item.name,
            <TouchableOpacity style={styles.permissionCell} onPress={() => handlePermissionChange(item.name, "Read")}>
                <Text style={styles.tickText}>{permissionData.Read ? "✔" : ""}</Text>
            </TouchableOpacity>,
            <TouchableOpacity style={styles.permissionCell} onPress={() => handlePermissionChange(item.name, "Create")}>
                <Text style={styles.tickText}>{permissionData.Create ? "✔" : ""}</Text>
            </TouchableOpacity>,
            <TouchableOpacity style={styles.permissionCell} onPress={() => handlePermissionChange(item.name, "Update")}>
                <Text style={styles.tickText}>{permissionData.Update ? "✔" : ""}</Text>
            </TouchableOpacity>,
            <TouchableOpacity style={styles.permissionCell} onPress={() => handlePermissionChange(item.name, "Delete")}>
                <Text style={styles.tickText}>{permissionData.Delete ? "✔" : ""}</Text>
            </TouchableOpacity>,
            <TouchableOpacity style={styles.permissionCell} onPress={() => handlePermissionChange(item.name, "Admin")}>
                <Text style={styles.tickText}>{permissionData.Admin ? "✔" : ""}</Text>
            </TouchableOpacity>
        ];
    });

    return (
        <View style={styles.pageContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <PullToRefresh data={role} keyExtractor={(item) => item.userName} refetch={userRefetch} />

                <View style={styles.formContainer}>
                    <View style={styles.header}>
                        <Text style={styles.label}>UserName:</Text>
                        <TextInput
                            value={roleName}
                            onChangeText={setRoleName}
                            style={styles.input}
                            placeholder="User role"
                        />
                        <Dropdown
                            selected={selectedRole}
                            label={<Text>Select Role:</Text>}
                            setSelected={setSelectedRole}
                            options={role}
                            style={styles.dropdown}
                        />
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    <Table borderStyle={styles.tableBorder}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                        <Rows data={tableData} style={styles.rows} textStyle={styles.cellText} />
                    </Table>
                </View>
            </ScrollView>
            {/* Floating Action Button positioned at the bottom */}
            <FloatingButton save={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        position: 'relative', // Ensure the floating button is positioned relative to this container
    },
    scrollContainer: {
        paddingBottom: 8, // Add padding at the bottom to avoid content being covered by the floating button
    },
    formContainer: {
        padding: 2,
    },
    header: {
        flexDirection: 'column',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        width: "80%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
    },
    dropdown: {
        marginTop: 2,
    },
    tableContainer: {
        flex: 1,
        marginBottom: 2,
    },
    tableBorder: {
        borderWidth: 1,
        borderColor: 'gray',
    },
    head: {
        height: 40,
        backgroundColor: "#f1f8ff",
    },
    headText: {
        textAlign: "center",
        fontWeight: "bold",
    },
    rows: {
        height: 40,
        borderBottomWidth: 1,
    },
    permissionCell: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tickText: {
        textAlign: 'center',
        fontSize: 18,
    },
});

