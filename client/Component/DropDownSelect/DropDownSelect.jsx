import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';  // You can use any icon library you like

const CustomDropdownSelect = ({selectedValue,width,height,style, setSelectedValue,items,placeholder,isyear,ismonth,close,setCloseModal,...props}) => {
 
 const screenWidth = Dimensions.get('window').width;
  const handleValueChange = (value,index) => {
    if(isyear || ismonth){
      setSelectedValue(value);
    }else{
    const getvalue=items?.find((data,thisindex)=>(thisindex+1)==index)
    setSelectedValue(getvalue);
    close=="direct" && setCloseModal(false)
    }
  };


  const pickerSelectStyles = {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: '#B0C4DE', // Lighter border color
      borderRadius: 10,
      backgroundColor: '#fff',
      color: '#333',
      width:width ||  250,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5, // For Android shadow effect
    },
    inputAndroid: {
      fontSize: 10,
      paddingVertical: 0,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: '#B0C4DE',
      borderRadius: 10,
      backgroundColor: '#fff',
      color: '#333',
      width:width || screenWidth/2.8 ,
      marginBottom: 7,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
      height:height || 50,
      padding:0
  
      
    },
    placeholder: {
      fontSize: 10,
      color: '#999',
    },
  };



  const years = isyear && Array.from({ length: 90 }, (_, i) => 1990 + i);

  const yearItems =isyear && years.map((year) => ({
    label: year.toString(),
    value: year,
  }));


  const months = [
    { label: 'January', value: 'January'},
    { label: 'February', value:'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June'},
    { label: 'July', value:'July'},
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October'},
    { label: 'November', value:'November'},
    { label: 'December', value:'December'},
  ];

  return (
    
      <RNPickerSelect
        onValueChange={handleValueChange}
        {...props}
        items={isyear ? yearItems : ismonth ? months : items}
        style={style || pickerSelectStyles}
        value={selectedValue}
        placeholder={{
          label: placeholder || 'Select a Department...',
          value: null,
        }}
       
      />
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F4F8', // Light background
  },
  label: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
    marginBottom: 15,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '#4CAF50',
  },
  icon: {
    marginRight: 10,
  },
});



export default CustomDropdownSelect;
