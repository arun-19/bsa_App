import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoutButton from '../ReusableComponents/LogOutButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCustomFonts } from './CustomHooks/useFonts';
import CustomText from './Text/CustomText';
import NotificationModal from './Modal/NotificationModal';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserDetails } from '../redux/Slices/UserDetails';
import { useGetCommonDataQuery, useGetUserMobDataQuery } from '../redux/service/misDashboardService';
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { handleLogout } from './Utils/Logout';
import  LogoutModal  from './Modal/LogutModal';
import CustomDrawer from './SideBar';


export default function NavBar({openSidebar, setopenSidebar}) {
    const {fontsLoaded}=useCustomFonts()
    const dispatch=useDispatch()
    const UserSelect=useSelector((state)=>state?.UserDetails)
    // const [openLogoutModal,setLogoutModal]=useState(false)
    const [modalVisible, setModalVisible]=useState(false)
    const navigation = useNavigation(); // Use the hook to get the navigation object
     const [wishes,setwishes]=useState((new Date().getHours() + 24) % 12 || 12)
     const [User,setUserName]=useState()
     const {data:getUserRole,refetch}=useGetCommonDataQuery({table:"MOBILEUSER m,GTDESIGNATIONMAST g,HREMPLOYDETAILS d ",fields:"m.ROLE,d.DEPTNAME,d.HOSTEL,d.PF,d.IDCARD,d.VEHICLE,d.SALTYPE,d.ESI,d.DOJ,g.DESIGNATION,m.IMAGE",where:` d.IDCARD=m.ID and  d.DESIGNATION=g.GTDESIGNATIONMASTID and m.ID='${UserSelect?.UserId}'`})
       const {data:mobData,isSuccess}=useGetUserMobDataQuery({params:{username:UserSelect?.userName}})

  

    useEffect(()=>{
        if(mobData?.data){
            dispatch(setUserDetails({
                ...mobData?.data[0]
            }))
        }
    },[isSuccess])

    
    useLayoutEffect(()=>{
        
        AsyncStorage?.getItem("userName",(error,result)=>{
            if(!error){ 
                const GetuserDetails=JSON.parse(result)
                setUserName(GetuserDetails?.userName)
                dispatch(setUserDetails({
                    userName:GetuserDetails?.userName,UserId:GetuserDetails?.Id,Role:getUserRole?.data[0]?.ROLE
                }))
            
            }
        })
        

    },[User])


    function getAmOrPm(date) {
        return date.toLocaleString('en-US', { hour: '2-digit', hour12: true }).split(' ')[1]; // Extracts AM/PM
    }

    const wishesTXT=()=>{
        if(wishes>=0 && wishes<=12 && getAmOrPm(new Date())=="AM"){
          return "Good Morning"
        }else if(wishes<=6 && wishes>=3){
          return "Good Evening"
        }else if(wishes>=12 && getAmOrPm(new Date())=="PM"){
          return "Good Afternoon"
        }else{
        return "Good Afternoon"
        }
      }

     

    return (
        <SafeAreaView>
        <View style={NewStyle.header}>
    
            
          {/* <View style={{position:"absolute"}}>  <LogoutModal isModalVisible={openLogoutModal}  confirm={()=>{
            handleLogout(navigation)
            navigation?.reset({
                index: 0, // This represents the index of the screen in the stack you want to be active
                routes: [
                  { name: 'LOGIN' }, // Replace with the name of the screen you want to navigate to
                ],
              })
            setLogoutModal(false)
          }} cancel={()=>setLogoutModal(false)}></LogoutModal></View> */}
       {  /*   <Image
                style={styles.title}
                source={require('./img/bharani-small.png')} 
            />

            <View style={styles.log}>
                <TouchableOpacity onPress={handleNavigate} style={styles.iconContainer}>
                    <Icon name="user" size={26} color="white" />
                </TouchableOpacity>

                <LogoutButton style={styles.logoutButton} />
            </View>
           */ }


               

                
           <View style={NewStyle?.wishesView}>
             {/*<CustomText style={NewStyle?.TimeDate} >{formattedDate}</CustomText>*/}
              
             
             <Image style={{width:40,height:42,opacity:1,backgroundColor:"white",borderRadius:30}} source={require("./../assets/Untitleddesign.png")}></Image>
             
             <CustomText style={NewStyle?.wishes}>Bharani Priya</CustomText>
            {/* <CustomText style={NewStyle?.wishes}>{wishesTXT()} {User}</CustomText>  */}
           </View>
       
           <View style={NewStyle?.NotificationView}>
            
           <View style={{position:"absolute",textAlign:"center"}}>
           
            <NotificationModal  modalVisible={modalVisible} setModalVisible={setModalVisible}></NotificationModal>
            
            </View>
            
            <Pressable onPress={() => setModalVisible(true)} style={{ position: "relative" }}>
    <View style={NewStyle.notificationBadge}>
      <Text style={NewStyle.badgeText}>2</Text>
    </View>
    <Ionicons style={NewStyle.iconWrap} name="notifications-outline" size={24} color="#1d1d1f" />
  </Pressable>
            
            
            {/* <Pressable onPress={()=>setLogoutModal(true)} > <MaterialCommunityIcons name="location-exit" size={24} color="black" /></Pressable> */}
            <Pressable onPress={() => setopenSidebar(true)} style={NewStyle.iconContainer}>
    <AntDesign name="bars" size={22} color="#1d1d1f" />
  </Pressable>
           </View>

         
           
        </View>
        {/* <View style={{position:"absolute",zIndex:10,right:-8,bottom:-13,width:15,borderTopEndRadius:0,borderTopRightRadius:0,height:27,borderBottomStartRadius:9,backgroundColor:"#4927a1",  transform: [{rotateZ:"-40deg"},{rotateY:"20deg"}]}}></View>
        <View style={{position:"absolute",zIndex:10,left:-8,bottom:-9,width:15,borderTopEndRadius:10,borderTopLeftRadius:0,height:20,borderBottomStartRadius:20,backgroundColor:"#4927a1",  transform: [{rotateZ:"40deg"},{rotateY:"20deg"}]}}></View> */}
        </SafeAreaView>
    );
}


const NewStyle = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: "#ffffff",
        borderBottomWidth: 0.5,
        borderColor: "#e5e5e5",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
  
    wishesView: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
  
    TimeDate: {
      opacity: 0.5,
      fontSize: 12,
      color: "#555",
    },
  
    wishes: {
        fontSize: 15,
        fontWeight: "900",
        letterSpacing: 1.1,
        color: "#1d1d1f",
        textShadowColor: 'rgba(0, 0, 0, 0.05)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
        fontFamily: "System", // Or your custom font if loaded
    },
  
    NotificationView: {
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
    },
  
    iconContainer: {
      padding: 8,
      borderRadius: 10,
      backgroundColor: "#f5f5f5",
      elevation: 2,
    },
  
    notificationBadge: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: "#ff3b30",
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      },
  
    badgeText: {
      color: "white",
      fontSize: 11,
      fontWeight: "bold",
    },
  
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 50,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
    },
    iconWrap: {
        backgroundColor: "#f2f2f2",
        padding: 8,
        borderRadius: 10,
        elevation: 2,
      },
  });
  

/*
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        fontFamily:"Dosis-Light",
        marginTop: 15,
        paddingVertical: 12,
        borderTopWidth:.1,
        borderBottomWidth: .5,
        borderBottomColor: '#8e8d8f', 
        shadowColor: "#8e8d8f", 
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 50,
         // Slight shadow effect for iOS-like feel
    },
    title: {
        width: 140,
        height: 35,
        margin: 5,
        alignSelf: 'center',
        resizeMode: 'contain',
        backgroundColor: "white",
        borderRadius: 8, // More rounded corners for a clean, soft look
        borderWidth: 0.5, // Thin border
        borderColor: '#dcdcdc', // Light border for a more subtle look
    },
    log: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    iconContainer: {
        paddingLeft:8, 
        paddingRight:8,
        paddingBottom:4,
        paddingTop:4,
        backgroundColor: '#007bff', 
        borderRadius: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2, 
    },
    logoutButton: {
        marginLeft: 10,
    },
});*/
