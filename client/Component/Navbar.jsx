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
import { MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { handleLogout } from './Utils/Logout';
import  LogoutModal  from './Modal/LogutModal';


export default function NavBar() {
    const {fontsLoaded}=useCustomFonts()
    const dispatch=useDispatch()
    const UserSelect=useSelector((state)=>state?.UserDetails)
    const [openLogoutModal,setLogoutModal]=useState(false)
    const [modalVisible, setModalVisible]=useState(false)
    const navigation = useNavigation(); // Use the hook to get the navigation object
     const [wishes,setwishes]=useState((new Date().getHours() + 24) % 12 || 12)
     const [User,setUserName]=useState()
     const {data:getUserRole,refetch}=useGetCommonDataQuery({table:"MOBILEUSER m,GTDESIGNATIONMAST g,HREMPLOYDETAILS d ",fields:"m.ROLE,d.DEPTNAME,d.HOSTEL,d.PF,d.IDCARD,d.VEHICLE,d.SALTYPE,d.ESI,d.DOJ,g.DESIGNATION,m.IMAGE",where:` d.IDCARD=m.ID and  d.DESIGNATION=g.GTDESIGNATIONMASTID and m.ID='${UserSelect?.UserId}'`})
       const {data:mobData,isSuccess}=useGetUserMobDataQuery({params:{username:UserSelect?.userName}})

     function handleNavigate() {
        navigation.navigate('USERANDROLES'); // Navigate to user roles screen
    }

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
            
          <View style={{position:"absolute"}}>  <LogoutModal isModalVisible={openLogoutModal}  confirm={()=>{
            handleLogout(navigation)
            navigation?.reset({
                index: 0, // This represents the index of the screen in the stack you want to be active
                routes: [
                  { name: 'LOGIN' }, // Replace with the name of the screen you want to navigate to
                ],
              })
            setLogoutModal(false)
          }} cancel={()=>setLogoutModal(false)}></LogoutModal></View>
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
             <TouchableOpacity onPress={handleNavigate} style={NewStyle.iconContainer}>
              <MaterialIcons name="manage-accounts" size={24} color="white" />
        
                </TouchableOpacity>
          {/* <FontAwesome name="search" size={24}  color="black" />*/}
          <TouchableOpacity   onPress={()=>{
            
            navigation.navigate("HOME")
           
            }}>  <Ionicons name="home-outline" size={24} color="white" /></TouchableOpacity>
           <View style={{position:"absolute",textAlign:"center"}}>
           
            <NotificationModal  modalVisible={modalVisible} setModalVisible={setModalVisible}></NotificationModal>
            
            </View>
            
            <Pressable onPress={()=>setModalVisible(true)} ><Text style={{position:"absolute",backgroundColor:"red",width:20,height:"60%",borderRadius:300,zIndex:20,textAlign:"center",color:"white",left:10,bottom:"50%"}} >2</Text> <Ionicons name="notifications" size={24} color="white" /></Pressable>
            
            
            <Pressable onPress={()=>setLogoutModal(true)} > <MaterialCommunityIcons name="location-exit" size={24} color="white" /></Pressable>
         
           </View>
           
        </View>
        <View style={{position:"absolute",zIndex:10,right:-8,bottom:-13,width:15,borderTopEndRadius:0,borderTopRightRadius:0,height:27,borderBottomStartRadius:9,backgroundColor:"#4927a1",  transform: [{rotateZ:"-40deg"},{rotateY:"20deg"}]}}></View>
        <View style={{position:"absolute",zIndex:10,left:-8,bottom:-9,width:15,borderTopEndRadius:10,borderTopLeftRadius:0,height:20,borderBottomStartRadius:20,backgroundColor:"#4927a1",  transform: [{rotateZ:"40deg"},{rotateY:"20deg"}]}}></View>
        </SafeAreaView>
    );
}


const NewStyle=StyleSheet.create({

    header:{
        paddingTop:"1%",
        paddingBottom:"5%",
        marginTop:"auto",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        shadowOffset:{width:10,height:1},
        paddingLeft:10,
        paddingRight:15,
        shadowRadius: 1, 
        elevation:70,
        shadowColor:"#ffff", 
        shadowOpacity:.8,
        backgroundColor:"#4927a1",position:"relative",
       
        
        
          
    },
    wishesView:{
        flexDirection:"row",
        gap:2,
        alignItems:"flex-end",
        justifyContent:"center",
       
       
    },
    TimeDate:{
        opacity:.5
    },
    wishes:{
       fontSize:13.5,
       fontWeight:"bold",
       marginLeft:2,
       letterSpacing:1.8,
       marginTop:4,
       color:"white",
       alignSelf:"center",
    
    },NotificationView:{
        flexDirection:"row",
        gap:25,
        alignSelf:"flex-end"
    },
    iconContainer:{
        backgroundColor:"rgba(241, 245, 248, 0.23)",
        padding:2,
        borderRadius:10

    }

})

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
