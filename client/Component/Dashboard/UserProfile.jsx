import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../Text/CustomText';
import { useGetUserBasicDetailsQuery, useGetUserImageQuery } from '../../redux/service/user';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImageViewModal from '../Modal/ImageViewModal';
import SkeletonLoader from '../SkeletonLoader/Skeleton';
import { LinearGradient } from 'expo-linear-gradient';
import { BASE_URL, USERS_API } from '../../constants/apiUrl';
import { Image } from 'expo-image';
import CommonModal from '../Modal/CommonModal';
import MoreUserDetails from './SubModules/MoreDetails';
import { useGetMoreDetailsQuery } from '../../redux/service/misDashboardService';
import { useSelector } from 'react-redux';

export function UserProfileCard({ style, USER, picture, openCamera }) {
  const { data, isLoading, isError } = useGetUserBasicDetailsQuery({ Idcard: USER?.UserId });
  const { data: userMoredetails } = useGetMoreDetailsQuery({ params: { Idcard: USER?.UserId } });
  const UserSelect = useSelector((state) => state?.UserDetails);

  const [openImageModal, setOpenImageModal] = useState(false);
  const [openMoreModal, setOpenMoreModal] = useState(false);

  const EmployeeDetail = data?.data;

  if (isLoading) return <SkeletonLoader width={'100%'} height={'20%'} />;
  if (isError) return <CustomText style={{ color: 'red' }}>Server could not connect</CustomText>;

  return (
    <View style={[styles.container, style]}>
      <ImageViewModal
        direct={picture}
        image={picture || `${BASE_URL}/${USERS_API}/getUserImage/${USER?.userName}`}
        visible={openImageModal}
        setVisible={setOpenImageModal}
      />

      <CommonModal
        isModalVisible={openMoreModal}
        BodyComponent={<MoreUserDetails data={userMoredetails?.data} />}
        setIsModalVisible={setOpenMoreModal}
        Title="More Details"
      />

<View style={styles.glassCard}>
  <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradientOverlay} />
  
  <TouchableOpacity onPress={() => setOpenImageModal(true)} style={styles.profileSection}>
    <Image
      source={{
        uri: picture || `${BASE_URL}/${USERS_API}/getUserImage/${USER?.userName?.toLowerCase()}`,
      }}
      style={styles.enhancedImage}
    />
    <MaterialCommunityIcons
      name="camera-retake-outline"
      size={22}
      color="#fff"
      style={styles.cameraIconNew}
      onPress={() => openCamera(true)}
    />
  </TouchableOpacity>

  <View style={styles.infoSection}>
    <CustomText style={styles.username}>{EmployeeDetail?.Name}</CustomText>
    <CustomText style={styles.designation}>
      {EmployeeDetail?.Designation} • {EmployeeDetail?.Department}
    </CustomText>
    <CustomText style={styles.empCode}>Employee ID: {EmployeeDetail?.EmpId}</CustomText>
  </View>

  <View style={styles.statSection}>
    <View style={styles.statBlock}>
      <CustomText style={styles.statLabel}>IN</CustomText>
      <CustomText style={styles.statValue}>{UserSelect?.INTIME || '--:--'}</CustomText>
    </View>
    <View style={styles.statBlock}>
      <CustomText style={styles.statLabel}>OUT</CustomText>
      <CustomText style={styles.statValue}>{UserSelect?.OUTTIME || '--:--'}</CustomText>
    </View>
    <View style={styles.statBlock}>
      <CustomText style={styles.statLabel}>Due</CustomText>
      <CustomText style={styles.statValue}>{UserSelect?.DUEAMT || '₹0'}</CustomText>
    </View>
  </View>
</View>

    </View>
  );
}

export default UserProfileCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: "flex",
    paddingBottom: 12,
  },

  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    elevation: 4,
    padding: 14,
    marginTop: "-32%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },

  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: "#ececec",
  },

  cameraIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
    elevation: 4,
    shadowColor: '#999',
  },

  textBlock: {
    marginLeft: 12,
    justifyContent: 'center',
  },

  welcomeText: {
    fontSize: 11,
    color: '#808080',
    marginBottom: 2,
    fontWeight: "500"
  },

  nameText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1c1c1e',
    textTransform: 'uppercase',
  },

  roleText: {
    fontSize: 12,
    color: '#4d4d4f',
    fontStyle: 'italic',
  },

  empIdText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2c3e50',
  },

  detailsContainer: {
    marginTop: 18,
    padding: 14,
    borderRadius: 15,
    backgroundColor: '#667eea', // fallback color
    elevation: 3,
  },

  timeText: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 12,
    fontWeight: '500',
    letterSpacing: 1,
  },

  detailRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },

  detailLabel: {
    color: '#f2f2f2',
    fontSize: 13,
    marginBottom: 6,
    fontWeight: "500",
  },

  detailValue: {
    color: '#ffffff',
    fontSize: 13,
    marginBottom: 6,
    fontWeight: "600",
  },

  badgeIcon: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    backgroundColor: '#ffffff33',
    padding: 6,
    borderRadius: 30,
  },
   glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 22,
    padding: 16,
    marginTop: "-35%",
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
    position: 'relative',
  },

  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.08,
    zIndex: -1,
    borderRadius: 22,
  },

  profileSection: {
    alignItems: 'center',
    marginBottom: 15,
  },

  enhancedImage: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },

  cameraIconNew: {
    position: 'absolute',
    top: 0,
    right: 5,
    backgroundColor: '#764ba2',
    borderRadius: 50,
    padding: 6,
    elevation: 3,
  },

  infoSection: {
    alignItems: 'center',
    marginBottom: 10,
  },

  username: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2d2d2d',
  },

  designation: {
    fontSize: 12.5,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 2,
  },

  empCode: {
    fontSize: 12,
    color: '#9e9e9e',
    marginTop: 4,
  },

  statSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },

  statBlock: {
    alignItems: 'center',
  },

  statLabel: {
    fontSize: 12,
    color: '#888',
  },

  statValue: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#333',
  },
  avatarWrapper: {
    borderRadius: 60,
    padding: 3,
    backgroundColor: '#15b35a',
    alignSelf: 'center',
    elevation: 6,
    shadowColor: '#15b35a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  avatarImage: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    borderWidth: 2,
    borderColor: '#fff',
  }
});
