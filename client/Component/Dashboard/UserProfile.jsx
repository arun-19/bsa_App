import React, { useEffect, useState } from 'react';
import { UserProfile } from './UserProfileStyle';
import { Text, View } from 'react-native';
import CustomText from '../Text/CustomText';
import { useGetUserBasicDetailsQuery, useGetUserImageQuery } from '../../redux/service/user';
import { AntDesign, Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import ImageViewModal from '../Modal/ImageViewModal';
import SkeletonLoader from '../SkeletonLoader/Skeleton';
import { LinearGradient } from 'expo-linear-gradient';
import { BASE_URL, USERS_API } from '../../constants/apiUrl';
import { Image } from 'expo-image';
import CustomizeButton from '../Buttons/CustomizeButton';
import CommonModal from '../Modal/CommonModal';
import { useGetMoreDetailsQuery } from '../../redux/service/misDashboardService';
import MoreUserDetails from './SubModules/MoreDetails';
import { useSelector } from 'react-redux';

export function UserProfileCard({ style, USER, picture, openCamera }) {
  const { data, isLoading, isError } = useGetUserBasicDetailsQuery({ Idcard:USER?.UserId });
  const {data:userMoredetails}=useGetMoreDetailsQuery({params:{Idcard: USER?.UserId}})
  const UserSelect=useSelector((state)=>state?.UserDetails)
  const [openImageModal, setOpenImageModal] = useState(false);
  const [OpenMoreModal,setOpenMoreModal]=useState(false)
  const EmployeeDetail = data?.data;

  if (isLoading) return <SkeletonLoader width={'100%'} height={'20%'} style={{ textAlien: 'center' }} />;

  if (isError) return <CustomText style={{ color: 'red' }}>Server could not connect</CustomText>;

   



  return (
    <View style={[UserProfile?.UserDetailContainer, { width: '100%', }, style]}>
       
      <ImageViewModal direct={picture} image={picture || BASE_URL + "/" + USERS_API + "/getUserImage/" + USER?.userName} visible={openImageModal} setVisible={setOpenImageModal}></ImageViewModal>
      <View style={{position:"absolute"}}> <CommonModal isModalVisible={OpenMoreModal} BodyComponent={<MoreUserDetails data={userMoredetails?.data}></MoreUserDetails>} setIsModalVisible={setOpenMoreModal} Title='More Details'></CommonModal></View>
      <View style={UserProfile?.ImageContainer}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',backgroundColor:"#f2f5f7",elevation:2,borderRadius:30,alignItems:"center",marginTop:1}}>
           
         <View style={{ zIndex: 10,  width: "50%",flexDirection:"row",alignItems:"center",gap:9, height: 82, padding: 2, borderRadius: 35,justifyContent:"center",marginLeft:"6%" }}>
           
           <View>
           
           <Image
              width={70}
              height={'90%'}
              onTouchStart={() => {
                setOpenImageModal(true);
              }}
              style={{
                borderRadius: 30,
                objectFit: 'cover',
                borderWidth: 1.9,
                borderColor: 'white',
                transform: [{ scale: 1.05 }],
                transition: 'transform 0.3s ease',
                justifyContent:"center",
                alignSelf:"center",
                marginLeft:10
              }}
              source={{
                uri: picture || BASE_URL + "/" + USERS_API+"/getUserImage/"+ USER?.userName?.toLowerCase(),
              }}
              cachePolicy={"none"}
            />
             <MaterialIcons
              style={{
                position:"absolute",
                right:0,
                bottom:0,
                borderRadius: 10,
                zIndex: 500,
                backgroundColor: '#f4f2f5',
                padding: 4,
                shadowColor: 'black',
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation:2
              }}
              onPress={() => openCamera(true)}
              name="flip-camera-ios"
              size={22}
              color="black"
            />

           </View>
           

<View style={{padding:2}}>
             <CustomText style={[ { fontSize: 8.5, fontWeight: 'bold', color: '#9a9b9c',marginBottom:10}]}>
              Welcome Back!
            </CustomText>

            
            <CustomText style={[ { fontSize: 15.5, fontWeight: 'bold', textTransform: 'uppercase', color: '#656665'}]}>
              {EmployeeDetail?.Name}
            </CustomText>
            
          <CustomText style={[ { fontSize: 10,color:"#656665",textTransform:"capitalize"}]}>
          {EmployeeDetail?.Designation}({EmployeeDetail?.Department})
          </CustomText>

            </View>   
            
            
          </View>
          
     
           
            
            <CustomText
              style={[
                UserProfile?.BlurViewText,
                { fontSize: 12, fontWeight: 'bold', color: '#14232F', alignSelf: 'center', textAlign: 'center',marginRight:10 },
              ]}
            >
              {EmployeeDetail?.EmpId}
            </CustomText>
          </View>
    
        <LinearGradient
          colors={['#4568f5','#be78f0']}
          
          style={[UserProfile?.BlurView, { overflow: 'hidden',flexDirection:"row",gap:12,marginTop:10,borderRadius:10 }]}
        >
          

          <View style={{width:"90%"}}>
          <CustomText style={[UserProfile?.BlurViewText, { fontSize: 18, marginTop: 6 }]}>
           IN Time : {UserSelect?.INTIME || "----"}             OUT Time : {UserSelect?.OUTTIME || "----"} 
          </CustomText>

            <View style={{display:"flex",flexDirection:"row",marginLeft:10}}>
                 <View style={{flexDirection:"column"}}>
                 <CustomText style={[UserProfile?.BlurViewText, { fontSize: 16, marginTop: 6 }]}>
          Advance Amount 
          </CustomText>
          <CustomText style={[UserProfile?.BlurViewText, { fontSize: 16, marginTop: 6 }]}>
           Due Amount 
          </CustomText>
          <CustomText style={[UserProfile?.BlurViewText, { fontSize: 16, marginTop: 6 }]}>
          Pending Instalments 
          </CustomText>
                 </View>

                 <View style={{flexDirection:"column"}}>
                 <CustomText style={[UserProfile?.BlurViewText, { fontSize: 16, marginTop: 6 }]}>
        : {UserSelect?.ADVBAL1}
          </CustomText>
          <CustomText style={[UserProfile?.BlurViewText, { fontSize: 16, marginTop: 6 }]}>
          : {UserSelect?.DUEAMT}
          </CustomText>
          <CustomText style={[UserProfile?.BlurViewText, { fontSize: 16, marginTop: 6 }]}>
         : {UserSelect?.PENDAMT}
          </CustomText>
               </View>
            </View>
         


         

          
          {/* <CustomText style={[UserProfile?.BlurViewText, { fontSize: 13, marginTop: 6 }]}>
            {EmployeeDetail?.Mobile ? EmployeeDetail?.Mobile : ' ----'}
          </CustomText>
          <CustomText style={[UserProfile?.BlurViewText, { fontSize: 13 }]}>
            {EmployeeDetail?.Department}
          </CustomText>
          <CustomText style={[UserProfile?.BlurViewText, { fontSize: 13 }]}>
            {EmployeeDetail?.Designation}
          </CustomText> */}

          <CustomizeButton onPress={()=>{setOpenMoreModal(true)}} style={{ButtonText:{color:"black"},ButtonOuter:{ position:"absolute",bottom:-18,backgroundColor:"white",borderWidth:0,padding:0,width:25,height:25,right:"-5%",justifyContent:"center"}}}>
          <Entypo name="info" size={17} color="black" />
          </CustomizeButton>
          </View>
         
        </LinearGradient>
      </View>
    </View>
  );
}

export default UserProfileCard;
