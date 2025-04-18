import React, { useState,useEffect } from "react"
import Employee from "./Employee"
import HeadofDepartMent from "./Head"
import TopManageMent from "./TopManage"
import CustomText from "../Text/CustomText"
import {Pressable, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"


function index({...props}) {

  const [Role,setRole]=useState("hod")
  if(Role=="employee")
  return (
    <Employee {...props}></Employee>
  )
  if(Role=="hod")
    return <HeadofDepartMent {...props}></HeadofDepartMent>

  if(Role=="Top")
    return <TopManageMent {...props}></TopManageMent>

  return <View style={{textAlign:"center",top:"50%",left:"30%",flexDirection:"column",justifyContent:"center"}}>
 <Pressable onPress={()=>props?.navigation.navigate("HOME")}> <FontAwesome name="home" style={{backgroundColor:"gray",width:40,borderRadius:10,marginLeft:70,marginBottom:20}} size={40} color="white" /></Pressable><CustomText >   No DashBoard Are Loaded!</CustomText>
  </View>

}

export default index