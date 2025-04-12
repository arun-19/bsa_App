import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import { useCreateRoleOnPageMutation, useGetDesignationQuery, useGetRolesOnPageQuery, useGetUserDetQuery, useGetUsersDetailsQuery, useGetUsersQuery, useUpdateRoleOnPageMutation } from '../../redux/service/user';
import tabs from '../tabIndex';
import PullToRefresh from '../../ReusableComponents/PullToRefresh';
import { Dropdown } from '../../ReusableComponents/inputs';
import { Table, Row, Rows, Col } from "react-native-table-component";
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native-gesture-handler';
import FloatingButton from '../Buttons/Buttons';
import { useCustomFonts } from '../CustomHooks/useFonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../Text/CustomText';
import { useSelector } from 'react-redux';
import ListView from '../List/ListView';

export default function UserCreation() {
    const [open, setOpen] = useState(false);
    const [edit,setEdit]=useState(false)
    const [disabled,setdisabled]=useState(true)
    const UserDetailsdata=useSelector(state=>state.UserDetails)
    const [selectedRole, setSelectedRole] = useState(null);
    const [permissions, setPermissions] = useState({});
    const [roleName, setRoleName] = useState(null);
    const [username,setUsername]=useState()
    const { data: role, refetch } = useGetDesignationQuery();
  //  const {data:userDetails}= useGetRolesOnPageQuery()
    const { data: roleOnPage, refetch: userRefetch } = useGetRolesOnPageQuery({ params: { selectedRole: selectedRole || "" } });
    const {fontsLoaded}=useCustomFonts()
    useEffect(() => {
            const fetchUser = async () => {
                const storedUser = await AsyncStorage.getItem('userName');
                setUsername(JSON?.parse(storedUser).userName); // Set the username in state
            };
            fetchUser();
        }, []);

    function onNew() {
        setPermissions({})
        
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

    const handleUpdateCustom = async (callback, data, text) => {
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
        setPagePermission(userData)
    }, [userData]);


    function setPagePermission(userData){
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
    }

    useEffect(()=>{
        setSelectedRole(UserDetailsdata?.Role)
    },[UserDetailsdata?.Role,edit])

    const [createUserOnRole] = useCreateRoleOnPageMutation();
    const [updateUserOnRole]=useUpdateRoleOnPageMutation()

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


    

const Update=(e)=>{
    e.preventDefault();
    const formData = { permissions, roleName:selectedRole };
    Alert.alert(
        "Confirmation",
        "Are you sure you want to Update the details?",
        [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: () => handleUpdateCustom(updateUserOnRole, formData, "User Updated") },
        ],
        { cancelable: false }
    );
    
   
}

function Refresh(){
    setEdit(false)
    setPermissions({})
    setdisabled(false)
    
}

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
}

    const EditData=()=>{
        try {
            userRefetch().then((data)=>{
               setPagePermission(data?.data?.data)   
            })
        } catch (error) {}
      
      setEdit(true)
      setSelectedRole(UserDetailsdata?.Role)
      setdisabled(false)
     
    };

    const RoleDataTable=(role?.data || [])?.map((item,index)=>{
       
        return [
           
            <TouchableOpacity disabled={disabled} style={styles.permissionCell} >
              <Text style={styles.tickText}>{index+1}</Text> 
            </TouchableOpacity>,
            <TouchableOpacity disabled={disabled} style={styles.permissionCell} >
              <Text style={styles.tickText}>{item?.value}</Text> 
            </TouchableOpacity>
            
        ]

    })

    const tableData = (tabs || []).map(item => {
        const permissionData = permissions[item.name] || {};

        return [
            item.name,
            <TouchableOpacity disabled={disabled} style={styles.permissionCell} onPress={() => handlePermissionChange(item.name, "Read")}>
                <Text style={styles.tickText}>{permissionData.Read ? "✔" : ""}</Text>
            </TouchableOpacity>,
            <TouchableOpacity disabled={disabled} style={styles.permissionCell} onPress={() => handlePermissionChange(item.name, "Create")}>
                <Text style={styles.tickText}>{permissionData.Create ? "✔" : ""}</Text>
            </TouchableOpacity>,
            <TouchableOpacity  disabled={disabled} style={styles.permissionCell} onPress={() => handlePermissionChange(item.name, "Update")}>
                <Text style={styles.tickText}>{permissionData.Update ? "✔" : ""}</Text>
            </TouchableOpacity>,
            <TouchableOpacity  disabled={disabled} style={styles.permissionCell} onPress={() => handlePermissionChange(item.name, "Delete")}>
                <Text style={styles.tickText}>{permissionData.Delete ? "✔" : ""}</Text>
            </TouchableOpacity>,
            <TouchableOpacity  disabled={disabled} style={styles.permissionCell} onPress={() => handlePermissionChange(item.name, "Admin")}>
                <Text style={styles.tickText}>{permissionData.Admin ? "✔" : ""}</Text>
            </TouchableOpacity>
        ];
    });

    return (<>
    
        <View style={styles.pageContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <PullToRefresh data={role} keyExtractor={(item) => item.userName} refetch={userRefetch} />

                <View style={styles.formContainer}>
                    <View style={styles.header}>
                        <CustomText style={styles.label}>UserName:{username}</CustomText>
                        <TextInput
                            value={roleName}
                            onChangeText={setRoleName}
                            style={styles.input}
                            placeholder="User role"
                        />
                        
                    </View>

                  
                  {edit &&   <Dropdown
                                selected={selectedRole}
                                 label={<Text>Select Role:</Text>}
                                setSelected={setSelectedRole}
                                options={role}
                                style={styles.dropdown}
                                            />}
                </View>

                <View style={styles.tableContainer}>
                    <Table borderStyle={styles.tableBorder}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                        <Rows data={tableData} style={styles.rows}  textStyle={styles.cellText} />
                    </Table>
                </View>

                <View style={[styles.tableContainer,{marginTop:10}]}>
                    <Table borderStyle={styles.tableBorder}>
                        <Row data={["S.NO","Name"]} style={styles.head} textStyle={styles.headText} />
                        <Rows data={RoleDataTable} style={styles.rows}  textStyle={styles.cellText} />
                    </Table>
                </View>



            </ScrollView>
            {/* Floating Action Button positioned at the bottom */}
            <FloatingButton save={handleSubmit} edit={EditData}  editable={edit} New={Refresh} Update={Update} />
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        position: 'relative', 
        // Ensure the floating button is positioned relative to this container
    },
    scrollContainer: {
        paddingBottom: 8,
        // Add padding at the bottom to avoid content being covered by the floating button
    },
    formContainer: {
        padding: 2,
    },
    header: {
        flexDirection: 'column',
    },
    label: {
        fontSize: 19,
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
         fontFamily:"Dosis-Bold"
    },
    rows: {
        height: "auto",
        width:"auto",
        borderBottomWidth: 1,
        fontFamily:"Dosis-Bold",
        fontWeight:"100",
        
        
    },
    permissionCell: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tickText: {
        textAlign: 'center',
        fontSize: 18,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        width: '100%',
        borderRadius: 10,
        textAlign:"right"
      }
});

