import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

import CustomText from '../Text/CustomText';


const CommonModal = ({isModalVisible,setIsModalVisible,height,Title="Modal",BodyComponent}) => {
  // Generate years from 1900 to the current year


  const styles = StyleSheet.create({
    container: {
    
      justifyContent: 'center',
      alignItems: 'center',
      padding: "20%",
    },
    title: {
      fontSize: 23,
      fontWeight: 'bold',
      marginBottom: 24,
    },
    button: {
      padding: 10,
      backgroundColor: '#007BFF',
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: "90%",
      alignItems: 'center',
      height: height || "70%" ,
      paddingTop:10
    },
    modalTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      
  
    },
    closeButton: {
      padding: 15,
      borderRadius: 5,
      right:-8,
      top:-12
    },
    closeButtonText: {
      color: 'red',
      fontSize: 19,
      textAlign:"center",
    
    },
  });

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const cancel=()=>{
    setIsModalVisible(false)
  }

  return (
    <View style={styles.container}>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          
          <View style={styles.modalContainer}>

          <TouchableOpacity style={[styles.closeButton,{justifyContent:"center",position:"absolute"}]} onPress={()=>cancel()}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          <Text style={styles.modalTitle}>{Title}</Text>
            
         <View style={{flexDirection:"column",gap:5,padding:0,height:"100%",width:"100%"}}>
               {/* <TouchableOpacity style={[styles.closeButton,{backgroundColor:"red"}]} onPress={confirm}>
              <Text style={[styles.closeButtonText,{backgroundColor:"red"}]}>Confirm</Text>
            </TouchableOpacity> */}
              {BodyComponent}
           
            </View>

            
          
          </View>

        
     
          
        </View>

        
      </Modal>
    </View>
  );
};


// Styling the picker input


export default CommonModal
