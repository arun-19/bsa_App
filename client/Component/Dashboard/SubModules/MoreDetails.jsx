import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; // You can install icons from 'react-native-vector-icons' or 'expo'
import { useSelector } from 'react-redux';

const MoreUserDetails = ({data}) => {
  const Users=useSelector((state=>state?.UserDetails))

  // Render each user's details
  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem}>
      <Text style={styles.userName}>{item.FNAME}</Text>
     
      <View style={styles.userDetail}>
      {item.GENDER=="MALE" && <MaterialCommunityIcons name="face-man" size={24} color="black" />}
      {item.GENDER=="FEMALE" && <MaterialCommunityIcons name="face-woman" size={24} color="black" />}
        <Text style={styles.userText}>{item.GENDER}</Text>
      </View>
      <View style={styles.userDetail}>
      <Ionicons name="language" size={24} color="black" />
        <Text style={styles.userText}>{item.LANGUAGE}</Text>
      </View>

      <View style={styles.userDetail}>
      <FontAwesome5 name="mobile-alt" size={24} color="black" />
          <Text style={styles.userText}>{item.CONTACTNO || "----"}</Text>
      </View>

      <View style={styles.userDetail}>
      <FontAwesome name="hotel" size={24} color="black" />
        <Text style={styles.userText}>HOSTEL - {item.HOSTEL}</Text>
      </View>

      <View style={styles.userDetail}>
      <FontAwesome6 name="money-bill-transfer" size={24} color="black" />
        <Text style={styles.userText}>ESI - {item.ESI}</Text>
      </View>

      <View style={styles.userDetail}>
      <FontAwesome6 name="money-bill-transfer" size={24} color="black" />
        <Text style={styles.userText}>PF - {item.PF}</Text>
      </View>

      <View style={styles.userDetail}>
      <FontAwesome6 name="handshake" size={24} color="black" />
        <Text style={styles.userText}>Date of Joining-{item.DOJ}</Text>
      </View>

      <View style={styles.userDetail}>
      <FontAwesome name="bank" size={24} color="black" />
        <Text style={styles.userText}>Salary By - {item.SALBY}</Text>
      </View>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.IDCARD}
        renderItem={renderUserItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 15,
    height:"80%"
  },
  userItem: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor:"white"
    // For Android shadow
    
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 1,
  },
  userDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default MoreUserDetails;
