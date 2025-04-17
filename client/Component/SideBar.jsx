import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import LogoutModal from './Modal/LogutModal';
import { handleLogout } from './Utils/Logout';
import { CustomNavigation } from './Utils/NavigationRef';

const { width } = Dimensions.get('window');
const drawerWidth = width * 0.75;

const CustomDrawer = ({  tabs, closeDrawer, activeRoute, openSidebar, setopenSidebar }) => {
      const [openLogoutModal,setLogoutModal]=useState(false)
  const slideAnim = useRef(new Animated.Value(drawerWidth)).current; // starts off-screen (right side)

  useEffect(() => {
    if (openSidebar) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: drawerWidth,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [openSidebar]);

  const handleCloseDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: drawerWidth,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setopenSidebar(false);
    });
  };

  function handleNavigate() {
   // CustomNavigation('USERANDROLES'); // Navigate to user roles screen
}

const renderItem = ({ item }) => {
  const isActive = activeRoute === item.path;

  return (
    <TouchableOpacity
      style={[styles.drawerItem, isActive && styles.activeItem]}
      onPress={() => {
        CustomNavigation(item?.path);
        handleCloseDrawer();
      }}
    >
      {/* You can dynamically show icons based on the route name or item config */}
      <View style={{flexDirection:"row",gap:10}}>
     {item?.icon}
      <Text style={[styles.drawerText, isActive && styles.activeText]}>
        {item.label || item.name}
      </Text>
      </View>
    </TouchableOpacity>
  );
};


  return (
    <>
      {openSidebar && (
        <Pressable style={styles.backdrop} onPress={handleCloseDrawer} />
      )}
      <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/data.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.profileName}>Welcome, User</Text>
        </View>

        <View style={styles.divider} />

        <FlatList
          data={tabs}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.menuContainer}
        />

        <View style={styles.footer}>
          <TouchableOpacity onPress={()=>setLogoutModal(true)}>
                 <View style={{position:"absolute"}}>  <LogoutModal isModalVisible={openLogoutModal}  confirm={()=>{
                          handleLogout(CustomNavigation)
                          // navigation?.reset({
                          //     index: 0, // This represents the index of the screen in the stack you want to be active
                          //     routes: [
                          //       { name: 'LOGIN' }, // Replace with the name of the screen you want to navigate to
                          //     ],
                          //   })
                          setopenSidebar(false)
                          setLogoutModal(false)
                        }} cancel={()=>setLogoutModal(false)}></LogoutModal></View>
            <Text style={styles.logoutText}> <MaterialCommunityIcons name="location-exit" size={24} color="red" />Logout</Text> handleCloseDrawer();
          
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 99,
  },
  drawerContainer: {
    width: drawerWidth,
    backgroundColor: '#f7f7f7',
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 20,
    position: 'absolute',
    right: 0,
    zIndex: 100,
    elevation: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  menuContainer: {
    paddingBottom: 20,
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  drawerText: {
    fontSize: 16,
    color: '#333',
    fontWeight:"bold"
  },
  activeItem: {
    backgroundColor: '#e0e0e0',
  },
  activeText: {
    color: '#000',
    fontWeight: '700',
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  logoutText: {
    fontSize: 16,
    color: '#e53935',
    fontWeight: '600',
  },
});

export default CustomDrawer;
