import { View, Dimensions, StyleSheet, ScrollView, TouchableOpacity, Animated, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import NavBar from '../Navbar';
import WebView from 'react-native-webview';
import { FontAwesome5, FontAwesome6, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CustomText from '../Text/CustomText';
import { useGetCommonDataQuery, useGetCurrentMonthLeavesQuery, useGetLastMonthSalaryQuery, useGetMonthESIPFQuery, useGetOverTimeQuery, useGetYearWiseToTSalaryQuery } from '../../redux/service/misDashboardService';
import CustomDropdown from '../DropDown/CustomDropDown';
import UserProfile, { UserProfileCard } from './UserProfile';
import { useGetUserBasicDetailsQuery } from '../../redux/service/user';
import { useSelector } from 'react-redux';
import { NumbertoCurrency } from '../Utils/NumberToCurrency';
import LoanProgressBar from './Chart/Employee/LoanChart';
import WorkingDaysChart from './Chart/Employee/WorkingDays';
import YearPicker from '../Modal/YearWiseModal';
import CameraViewModal from '../Modal/CameraModal';
import CameraScreen from '../Modal/CameraModal';
import CameraModal from '../Modal/CameraModal';
import SkeletonLoader from '../SkeletonLoader/Skeleton';
import CustomDropdownSelect from '../DropDownSelect/DropDownSelect';
import CustomizeButton from '../Buttons/CustomizeButton';
import { LastMonthandYear } from '../Utils/getCurrentMonth';
import CommonModal from '../Modal/CommonModal';
import PfIndividualModalBody from './Individual/Card/PfIndividualModalBody';
import EsiIndividualModalBody from './Individual/Card/EsiIndividualModalBody';
import OTIndividualModalBody from './Individual/Card/OTIndividualModalBody';
import OTESIPFFilter from './Individual/Card/OTESIPFFilterBody';
import MoreSalaryDetails from './SubModules/MoreSalaryDetails';
import WorkingHoursChart from './Chart/Employee/WorkingHour';




export default function Employee({navigation}) {
  const [animatedValue] = useState(new Animated.Value(0));
  const UserId=useSelector((state=>state?.UserDetails))
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraModal,setisCameraModel]=useState(false)
  const [profilepicture,setprofilepicture]=useState()
  const [selectMonthSalary,setSelectMonthSalary]=useState({date:new Date(),format:""})
  const screenWidth = Dimensions.get('window').width;
  const chartHeight = Dimensions.get('window').height * 0.3; 
  const [Year,setYear]=useState(new Date().getFullYear())
  const chartWidth = screenWidth - 20;
  const [scroll,setscroll]=useState(true)
  const [yearWiseModal,setyearWiseModal]=useState(false)
  const [epMonth,setepMonth]=useState()
  const [epyear,setepyear]=useState()
  const [isIndividualEsiModel,issetIndividualEsiModel]=useState(false)
  const [isIndividualPFModel,issetIndividualPFModel]=useState(false)
  const [isIndividualOTModel,issetIndividualOTModel]=useState(false)
  const [isOpenYMEPO,issetOpenYMEPO]=useState(false)
  const [OTESIPF_Year,set_OTESIPF_Year]=useState()
  const [OTESIPF_Month,set_OTESIPF_Month]=useState()

  const [OPEN_MORE_SALARY,SET_OPEN_MORE_SALARY]=useState(false)


  
  
  

  




  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const ChartStyle = StyleSheet.create({
    ChartContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      gap: 7,
      paddingBottom: 16,
    },
  
    ChartView: {
      marginBottom: 5,
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 14,
      width: screenWidth - 40,
      shadowColor: "#bec1c4",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 6,
      justifyContent: "center",
    },
  
    HeaderCustomText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 6,
    },
  
    metricCard: {
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: 16,
      marginVertical: 8,
      borderLeftWidth: 6,
      borderLeftColor: '#5f27cd', // dynamic based on context
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 8,
    },
    MetricCard_end: {
      backgroundColor: '#fcfafa',
      borderRadius: 12,
      padding: 16,
      marginBottom: 10,
      width: '100%',
      height: 120,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      justifyContent: "center",
      alignItems: 'center',
    },
  
    MetricTitle: {
      fontSize: 14,
      fontWeight: '700',
      fontFamily: "Dosis-Bold",
      color: '#6d6d70',
      marginBottom: 6,
    },
  
    MetricTitle_card: {
      fontSize: 15,
      fontWeight: '800',
      fontFamily: "Dosis-Bold",
      color: '#1f1f1f',
      marginBottom: 12,
      textAlign: "left",
    },
  
    MetricValue: {
      fontSize: 18,
      color: '#1B81DB',
      fontWeight: 'bold',
    },
  
    Button: {
      marginTop: 10,
      paddingVertical: 8,
      paddingHorizontal: 20,
      backgroundColor: '#747f91',
      borderRadius: 25,
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
    },
  
    TopBox: {
      backgroundColor: "#69b6f5",
    },
  
    fab: {
      position: 'absolute',
      bottom: "40%",
      right: -30,
      width: 65,
      height: 100,
      borderRadius: 30,
      backgroundColor: "rgba(255, 255, 255, 0.86)",
      justifyContent: 'center',
      alignItems: "flex-start",
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      zIndex: 500,
      borderWidth: 0.6,
      borderColor: "#c5c7c9",
    },
  
    MiniCard: {
      backgroundColor: '#15b35a', // Default, override with inline bgColor
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 10,
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      shadowColor: "#bec1c4",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
    },
  
    MiniCard_Title: {
      fontSize: 13,
      color: "white",
      fontWeight: "600",
      marginBottom: 4,
    },
  
    MiniCard_Value: {
      color: "white",
      fontSize: 16,
      fontWeight: "700",
    },
  });
  
 

const {data:LastMonthSalary}=useGetLastMonthSalaryQuery({Idcard:UserId?.UserId})


const LastMonthSalaryAmount=NumbertoCurrency(LastMonthSalary?.data?.salary || 0)
const LastMonthgrossSalaryAmount=NumbertoCurrency(LastMonthSalary?.data?.gross || 0)
const {data:getLoan,refetch}=useGetCommonDataQuery({table:"HRMPAYTRANS",fields:"SUM(TOTPAIDAMT) Totalpaid,Sum(TOTLOANAMT) TOTLOANAMT ",where:`IDCARD='${UserId?.UserId}' and ACTUAL='T' and active='YES' and ADVTYPE='Loan' group by IDNAME `})
const {data:getWorkingDays,isLoading:workingdatloading}=useGetCommonDataQuery({table:"BPPHPAYROLL",fields:"PAYPERIOD,wdays",where:` ID='${UserId?.UserId}' and pctype='ACTUAL' and PAYPERIOD like '%${Year}' `,map:"false"})
const {data:CurrentMonthLeaves}=useGetCurrentMonthLeavesQuery({Idcard:UserId?.UserId})


var OTpfEsiPayperiod=epMonth  && epyear ? epMonth+" "+epyear : LastMonthandYear

const {data:esipfdata,error:err}=useGetMonthESIPFQuery({params:{
  Idcard:UserId?.UserId,payperiod:OTpfEsiPayperiod
}})
const {data:OverTimedata,isLoading:IsOverTimeLoading}=useGetOverTimeQuery({params:{
  Idcard:UserId?.UserId,payperiod:OTpfEsiPayperiod,COMPCODE:UserId?.GCOMPCODE
}})



 
const esipfdataOnMonth=esipfdata?.data ? esipfdata?.data[0] : {} 
const  OtData=OverTimedata?.data ? OverTimedata?.data?.reduce(function (acc, obj) { return {OTAMT:acc.OTAMT + obj.OTAMT,OT:acc.OT + obj.OT} }, {OTAMT:0,OT:0}) : {}



useEffect(()=>{
refetch()
},[Year])
 
 return (<>

  <CameraModal visible={isCameraModal} USER={UserId} setVisible={setisCameraModel} onPictureTaken={setprofilepicture}></CameraModal>

    <View style={{ flex: 1, padding: 8, backgroundColor: '#f5f5f5', width: "100%"}}>

     
   {/*   <TouchableOpacity style={ChartStyle.fab}  onPress={()=>{navigation.navigate("HOME")}}>
        <Ionicons name="home" size={20} style={{paddingLeft:8}} color="#a4a0ad" />
      </TouchableOpacity>*/}
    {/*  <View style={[UserProfile?.UserDetailContainer,{width:"100%",height:"40%"}]} >
           <View style={UserProfile?.ImageContainer}>
            <Image width={"98%"} height={"90%"} style={{objectFit:"cover",borderRadius:19,opacity:.9}} source={{uri:"https://www.shutterstock.com/image-photo/young-smiling-successful-employee-business-600nw-2358608485.jpg"}}></Image>
            <View style={UserProfile?.BlurView}>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><CustomText style={[UserProfile?.BlurViewText,{fontSize:20,fontWeight:"bold"}]}> Harish</CustomText><CustomText style={[UserProfile?.BlurViewText,{fontSize:10,margin:10,fontWeight:"bold"}]}>20203003</CustomText></View>
              
              <CustomText style={UserProfile?.BlurViewText}>+91 6382158436</CustomText>
              <CustomText style={UserProfile?.BlurViewText}> Supervisor</CustomText>
            </View>
            </View>
      </View>*/}
     <View style={{position:"absolute"}}>
      <CommonModal  height={"30%"}  isModalVisible={isIndividualEsiModel} Title='ESI FILTER' BodyComponent={<EsiIndividualModalBody UserId={UserId?.UserId} CurrentESIAmt={NumbertoCurrency(esipfdataOnMonth?.esi  || 0)} CurrentYearandMonth={OTpfEsiPayperiod}></EsiIndividualModalBody>} setIsModalVisible={issetIndividualEsiModel}></CommonModal>
      <CommonModal height={"30%"} isModalVisible={isIndividualPFModel} Title='PF FILTER' BodyComponent={<PfIndividualModalBody UserId={UserId?.UserId}  CurrentPFAmt={NumbertoCurrency(esipfdataOnMonth?.esi  || 0)} CurrentYearandMonth={OTpfEsiPayperiod}></PfIndividualModalBody>} setIsModalVisible={issetIndividualPFModel}></CommonModal>
      <CommonModal isModalVisible={isIndividualOTModel} Title='OT FILTER' BodyComponent={<OTIndividualModalBody UserId={UserId}  CurrentOTAmt={NumbertoCurrency(OtData?.OTAMT  || 0)}  CurrentYearandMonth={OTpfEsiPayperiod}></OTIndividualModalBody>} setIsModalVisible={issetIndividualOTModel}></CommonModal>
      <CommonModal height={"20%"} isModalVisible={isOpenYMEPO} Title='OT & ESI &  PF FILTER' BodyComponent={<OTESIPFFilter year={OTESIPF_Year} setepYear={setepyear} setepMonth={setepMonth} setyear={set_OTESIPF_Year} Month={OTESIPF_Month} setMonth={set_OTESIPF_Month} closeModel={issetOpenYMEPO} CurrentYearandMonth={OTpfEsiPayperiod}></OTESIPFFilter>} setIsModalVisible={issetOpenYMEPO}></CommonModal>
       <YearPicker setIsModalVisible={setyearWiseModal} isModalVisible={yearWiseModal} setSelectedYear={setYear} selectedYear={Year}></YearPicker>
       
       <CommonModal  height={"50%"} isModalVisible={OPEN_MORE_SALARY} BodyComponent={<MoreSalaryDetails data={LastMonthSalary?.data}></MoreSalaryDetails>} setIsModalVisible={SET_OPEN_MORE_SALARY} Title='Deductions Details'></CommonModal>
       </View>
     
      
      
      <ScrollView alwaysBounceVertical
      showsVerticalScrollIndicator={false}
      scrollEnabled={scroll}
      style={{ padding: 1,marginTop:-16, width: "100%" , 
        scrollbarThumbVertical: 'red', // Thumb color (Android only)
         scrollbarTrackVertical: '#f0f0f0',
          // Track color (Android only)
              }}>
          <UserProfileCard USER={UserId} picture={profilepicture} openCamera={setisCameraModel} ></UserProfileCard>
        {/* Metrics Section */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10, marginVertical: 12 }}>
  
  {/* Last Month Salary Card */}
  <TouchableOpacity
    onPress={() => SET_OPEN_MORE_SALARY(true)}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      elevation: 6,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      borderLeftWidth: 5,
      borderLeftColor: '#15b35a'
    }}
  >
    <View style={{ flexDirection: 'column' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2d3436', marginBottom: 6 }}>
        <FontAwesome5 name="wallet" size={16} color="#15b35a" /> Last Month Salary
      </Text>
      <Text style={{ color: '#038024', fontSize: 14, fontWeight: '600' }}>GROSS: {LastMonthgrossSalaryAmount}</Text>
      <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#000' }}>NET: {LastMonthSalaryAmount}</Text>
      {selectMonthSalary?.format && (
        <Text style={{ fontSize: 12, color: '#6c757d' }}>{String(selectMonthSalary?.format)}</Text>
      )}
    </View>
    
  </TouchableOpacity>

  {/* Absent Card */}
  <View
    style={{
      width: '100%',
      backgroundColor: '#e6faff',
      borderRadius: 12,
      padding: 16,
      elevation: 6,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      borderLeftWidth: 5,
      borderLeftColor: '#2ac6d1',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#11899b', marginBottom: 6 }}>
        <MaterialCommunityIcons name="calendar-remove" size={18} color="#2ac6d1" /> Total Absent
      </Text>
      <Text
        style={{
          fontSize: typeof CurrentMonthLeaves?.data?.Leave === 'string' ? 13 : 16,
          color: typeof CurrentMonthLeaves?.data?.Leave === 'string' ? '#c7342a' : '#000',
          fontWeight: 'bold',
        }}
      >
        {typeof CurrentMonthLeaves?.data?.Leave === 'number'
          ? CurrentMonthLeaves?.data?.Leave + ' Days'
          : CurrentMonthLeaves?.data?.Leave}
      </Text>
    </View>
  </View>
</View>

      



        {/* Charts Section */}
        <View style={ChartStyle.ChartContainer}>

{/* ESI, PF, OT Block */}
<Animated.View style={{ opacity: animatedValue }}>
  <View style={[ChartStyle.ChartView, { justifyContent: "center" }]}>
    <TouchableOpacity onPress={() => issetOpenYMEPO(true)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 }}>
      <Text style={[ChartStyle.MetricTitle, { fontWeight: "600" }]}>
        ESI & PF & OT – {esipfdataOnMonth?.PAYPERIOD}
      </Text>
      <MaterialCommunityIcons name="filter-outline" size={16} color="#6d6d70" />
    </TouchableOpacity>

    <View style={{ flexDirection: "row", justifyContent: "space-between",gap:2, marginTop: 14 }}>
      {/* ESI */}
      <TouchableOpacity onPress={() => issetIndividualEsiModel(true)} style={[ChartStyle.MiniCard, { backgroundColor: "#15b35a" }]}>
        <CustomText style={ChartStyle.MiniCard_Title}>ESI</CustomText>
        <CustomText style={ChartStyle.MiniCard_Value}>{NumbertoCurrency(esipfdataOnMonth?.esi || 0)}</CustomText>
      </TouchableOpacity>

      {/* PF */}
      <TouchableOpacity onPress={() => issetIndividualPFModel(true)} style={[ChartStyle.MiniCard, { backgroundColor: "#2ac6d1" }]}>
        <CustomText style={ChartStyle.MiniCard_Title}>PF</CustomText>
        <CustomText style={ChartStyle.MiniCard_Value}>{NumbertoCurrency(esipfdataOnMonth?.pf || 0)}</CustomText>
      </TouchableOpacity>

      {/* OT */}
      <TouchableOpacity onPress={() => issetIndividualOTModel(true)} style={[ChartStyle.MiniCard, { backgroundColor: "#a159d9" }]}>
        <CustomText style={ChartStyle.MiniCard_Title}>Over Time</CustomText>
        <CustomText style={ChartStyle.MiniCard_Value}>{OtData?.OT} Hr</CustomText>
        <CustomText style={[ChartStyle.MiniCard_Value, { fontSize: 14.5 }]}>
          {NumbertoCurrency(OtData?.OTAMT || 0)}
        </CustomText>
      </TouchableOpacity>
    </View>
  </View>
</Animated.View>

{/* Attendance Chart */}
{
  workingdatloading ? (
    <SkeletonLoader width={"100%"} height={"20%"} style={{ textAlign: "center" }} />
  ) : (
    <Animated.View style={{ opacity: animatedValue }}>
      <View style={ChartStyle.ChartView}>
        <TouchableOpacity onPress={() => setyearWiseModal(true)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <CustomText style={ChartStyle.MetricTitle}>Attendance Logs</CustomText>
          <MaterialCommunityIcons name="filter-outline" size={16} color="#6d6d70" />
        </TouchableOpacity>

        <WorkingDaysChart
          isLoading={workingdatloading}
          data={getWorkingDays?.data}
          year={Year}
          UserId={UserId}
          setscroll={setscroll}
        />

        <CustomText style={[ChartStyle.MetricTitle, { textAlign: "center", fontSize: 10, marginTop: 8 }]}>
          Year: {Year}
        </CustomText>
      </View>
    </Animated.View>
  )
}

{/* Loan Progress Section */}
<Animated.View style={{ opacity: animatedValue }}>
  <View style={[ChartStyle.ChartView, { justifyContent: "center" }]}>
    <CustomText style={[ChartStyle.MetricTitle, { marginLeft: 10 }]}>Loan Details</CustomText>
    <LoanProgressBar data={getLoan?.data} />
  </View>
</Animated.View>

</View>

      </ScrollView>
    </View>
    </>
  );
}




