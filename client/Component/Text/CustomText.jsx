import { useFonts } from "expo-font"
import { Text } from "react-native"
import { useCustomFonts } from "../CustomHooks/useFonts"
import React from "react"


function CustomText({style,children,...props}) {

    const {fontsLoaded}=useCustomFonts()
  return (
   <Text style={[style,{fontFamily:"Dosis-Regular"}]} {...props}>{children}</Text>
  )
}

export default CustomText