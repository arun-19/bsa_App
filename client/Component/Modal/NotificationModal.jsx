import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomText from '../Text/CustomText';
import { FlatList } from 'react-native';


export default function NotificationModal({modalVisible, setModalVisible}) {
  // State to control modal visibility
  // Function to open the modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const hideModal = () => {
    setModalVisible(false);
  };

  const NotificationData=[
    {    id:100,
        sendBy:"Production Team",
        description:"oversees all aspects of a company's manufacturing process, ensuring products are produced efficiently, on time, and within budget, while maintaining quality standards and safety protocols."
    },{    id:101,
        sendBy:"Sales Team",
        description:"oversees all aspects of a company's manufacturing process, ensuring products are produced efficiently, on time, and within budget, while maintaining quality standards and safety protocols."
    }
  ]


  const NotificationItem = ({ sendBy, description, onPress }) => (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.textContainer}>
        <CustomText style={styles.title}>{sendBy}</CustomText>
        <CustomText style={styles.description}>{description}</CustomText>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <NotificationItem
    sendBy={item.sendBy}
      description={item.description}
      onPress={() => {}}
    />
  );

  return (
    <View style={styles.container}>
      

      {/* Modal positioned at the top */}
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
        
      >
        <View style={styles.modalBackground}>
            
          <View style={styles.modalContainer}>
          <Image style={{position:"absolute",height:40,width:40,top:10}} source={require("../../assets/Notification.png")}></Image>
               {NotificationData?.length>0 ?   <FlatList
            data={NotificationData}
                renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={{width:"100%",height:"100%",marginTop:20}}
        contentContainerStyle={styles.list}
      /> : <CustomText style={styles.modalText}>No Notification are Available Here!</CustomText>} 
            <TouchableOpacity style={styles.button} onPress={hideModal}>
              <Text style={styles.buttonText}><AntDesign name="close" size={25} color="red" /></Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-start', // Align the modal at the top
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '80%', // Make the modal full width
    padding: 30,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 59, // This adds some space from the top of the screen
    alignItems: 'center',
    marginLeft:"15%",
    height:"40%",
    alignContent:"center",
    textAlign:"center"
  },listItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 8,
    padding: 15,
    elevation: 2, // Shadow effect on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,width:"100%",
    height:"100%"
  },textContainer: {
    justifyContent: 'center',
    padding:10,
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign:"center",
    alignSelf:"center",
    top:"40%",
    fontWeight:"light"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },button:{
    position:"absolute",
    right:4,
    top:2
  },title:{
    color:"black",
    fontWeight:"bold"
  }
});