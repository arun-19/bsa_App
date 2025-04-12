import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomText from "../Text/CustomText";


function CustomizeButton({children,style,...props}) {

    const ButtonStyle=StyleSheet.create({
      ButtonOuter:{
        borderWidth:1,
        backgroundColor:"black",
        padding:10,
        borderRadius:10,
        width:200,
       alignItems:"center",
       shadowColor: '#c9c6c5',
       shadowOpacity: 0.2,
       shadowRadius: 3,
       zIndex:100
      },
      ButtonText:{
       color:"white"
      }
    })
  return (
    <TouchableOpacity style={[ButtonStyle.ButtonOuter,style?.ButtonOuter]}  {...props}>
        <CustomText style={[ButtonStyle.ButtonText,style?.ButtonText]}  
        {...props}>{children}</CustomText>
    </TouchableOpacity>
  )
}

export default CustomizeButton