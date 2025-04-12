import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from '../Text/CustomText';
import { EvilIcons } from '@expo/vector-icons';

const FilterModal = ({modalVisible, setModalVisible,name,close,children}) => {
  

 

  return (
    <View style={styles.container}>
      {/* Button to open modal */}

      {/* Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <EvilIcons name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{name}</Text>

            {/* Dropdown */}
            
            {children}
           
{close!="direct" &&
            <TouchableOpacity
              onPress={() => {
                // Filter action
                setModalVisible(false);
              }}
              style={styles.filterButton}>
              <Text style={styles.buttonText}>Apply Filter</Text>
            </TouchableOpacity>
            }
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  filterButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
  },
});

// Style for Picker Select (dropdown)
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    width: 250,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#000',
    marginBottom: 10,
  },
  inputAndroid: {
    height: 90,
    width: 250,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#000',
    marginBottom: 10,
  },
});

export default FilterModal;
