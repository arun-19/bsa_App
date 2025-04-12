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
    ChartView: {
      marginBottom: 1,
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 10,
      width: (screenWidth - 40) ,
      shadowColor: "#bec1c4",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 50,
      justifyContent: "center",
      fontFamily: "Dosis-Regular"
    },
    ChartContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems:"center",
      gap: 10,
      paddingBottom: 10,
 
      
      
    },
    HeaderCustomText: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: .5,
      color: '#333',
    },MetricCard_end:{
      backgroundColor: '#fcfafa',
      borderRadius: 12,
      padding: 13,
      marginBottom: 5,
      width: "100%",
      height:120,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
      rowGap: 1,
      justifyContent: "center",
      alignItems: 'center',
      paddingBottom:15,marginTop:9
    },
    MetricCard: {
      backgroundColor: '#fcfafa',
      borderRadius: 7,
      padding: 15,
      marginBottom: 5,
      width: (screenWidth - 40) / 2,
      shadowColor: "#bec1c4",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 50,
      rowGap: 1,
      justifyContent: 'center',
      alignItems: 'center',paddingBottom:35,
      height:"100%",
      
    },
    MetricTitle: {
      fontSize: 14,
      fontFamily:"Dosis-Bold",
      fontWeight:"900",
      color: '#6d6d70',
      marginBottom: 7,
    }, MetricTitle_card: {
      fontSize: 14.5,
      fontFamily:"Dosis-Bold",
      fontWeight:"900",
      color: 'black',
      marginBottom: 10,
      textAlign:"center",
      padding:4
    },
    MetricValue: {
      fontSize: 20,
      color: '#1B81DB',
      fontWeight:"bold"
    },
    Button: {
      marginTop: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#747f91',
      borderRadius: 25,
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    TopBox:{
        backgroundColor:"#69b6f5"
    },
  fab: {
    position: 'absolute',
    bottom:"40%",
    right: -30,
    width: 65,
    height: 100,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.86)",
    justifyContent: 'center',
    alignItems: "flex-start",
    elevation: 50, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    zIndex:500,
    borderWidth:.4,
    borderColor:"#c5c7c9"
  },MiniCard:{
    backgroundColor: '#fcfafa',
    borderRadius: 10,
    marginBottom: 5,
    width:100,
    shadowColor: "#bec1c4",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 50,
    rowGap: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:20,


  },MiniCard_Title:{
    
    margin:7,
    padding:1,
    color:"white",
  
  },MiniCard_Value:{
    color:"white"
  }
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
  <NavBar />
  <CameraModal visible={isCameraModal} USER={UserId} setVisible={setisCameraModel} onPictureTaken={setprofilepicture}></CameraModal>

    <View style={{ flex: 1, padding: 15, backgroundColor: '#E5E7E7', width: "100%"}}>

     
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
        <View  style={{ flexDirection: 'row', flexWrap: 'wrap',height:"12%", justifyContent: 'space-between',marginTop:0,marginBottom:10}}>
        
          <View style={[ChartStyle.MetricCard,{borderLeftWidth:4,borderLeftColor:"#15b35a"}]}>
         
           <TouchableOpacity style={{flexDirection:"row"}} onPress={()=>SET_OPEN_MORE_SALARY(true)}> <CustomText style={ChartStyle.MetricTitle_card}  >Last Month Salary  </CustomText> <Foundation  style={{marginTop:"3%"}} name="indent-more" size={19} color="gray" /></TouchableOpacity>
            
         
            <CustomText style={[ChartStyle.MetricValue,{fontSize:14,color:"#038024"}]}>GROSS: {LastMonthgrossSalaryAmount}</CustomText>
            <View style={{paddingTop:2,borderBottomWidth:.6,width:"90%",borderColor:"#b2b8b4"}}></View>
            <CustomText style={[ChartStyle.MetricValue,{fontSize:17}]}>NET: {LastMonthSalaryAmount}</CustomText>
           {selectMonthSalary?.format &&  <CustomText style={[ChartStyle.MetricValue,{fontSize:14}]}> {String(selectMonthSalary?.format)}</CustomText>}
           {/* <TouchableOpacity style={ChartStyle.Button}>
              <CustomText style={{ color: '#fff' }}>View Details</CustomText>
            </TouchableOpacity>*/}
          </View>
          <View style={[ChartStyle.MetricCard,{backgroundColor:"#e9f4f5",borderLeftWidth:4,borderLeftColor:"#2ac6d1"}]}>
            <CustomText style={ChartStyle.MetricTitle_card}>Total Absent </CustomText>
            <CustomText style={[ChartStyle.MetricValue,{color:typeof(CurrentMonthLeaves?.data?.Leave=="String") && "#c7342a",fontSize:typeof(CurrentMonthLeaves?.data?.Leave=="String") && 13}]}> {typeof(CurrentMonthLeaves?.data?.Leave)=="number" ?  CurrentMonthLeaves?.data?.Leave+"Days" : CurrentMonthLeaves?.data?.Leave}</CustomText>
           {/* <TouchableOpacity style={ChartStyle.Button}>
              <CustomText style={{ color: '#fff' }}>View Details</CustomText>
            </TouchableOpacity>*/}
          </View>

      
        </View>

      



        {/* Charts Section */}
        <View style={ChartStyle.ChartContainer}>


        <Animated.View
            style={{
              opacity: animatedValue,
            }}
          >
            <View style={[ChartStyle.ChartView, { justifyContent: "center"}]}>
            <View  style={ChartStyle.MetricTitle}>
            <Text style={[ChartStyle.MetricTitle,{marginLeft:1,fontWeight:"400"}]}> <TouchableOpacity onPress={()=>issetOpenYMEPO(true)} style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:10}}><Text style={ChartStyle?.MetricTitle}>ESI & PF & OT On {esipfdataOnMonth?.PAYPERIOD}<MaterialCommunityIcons style={{borderRadius:30,padding:5}} name="filter-outline" size={15} color="#6d6d70" /></Text></TouchableOpacity> </Text>
            </View>
           

              <View style={{flexDirection:"row",justifyContent:"center",gap:"2.4%",padding:0,paddingTop:".5%"}}>
                        
                     <View onTouchEnd={()=>issetIndividualEsiModel(true)} style={[ChartStyle?.MiniCard,{backgroundColor:"#15b35a"}]}>
                      <CustomText style={ChartStyle?.MiniCard_Title}>ESI</CustomText>
                      <CustomText style={ChartStyle?.MiniCard_Value}>{NumbertoCurrency(esipfdataOnMonth?.esi  || 0)}</CustomText>
                     
                     </View>

                     <View onTouchEnd={()=>issetIndividualPFModel(true)} style={[ChartStyle?.MiniCard,{backgroundColor:"#2ac6d1"}]}>
                      <CustomText style={ChartStyle?.MiniCard_Title}>PF</CustomText>
                      <CustomText style={ChartStyle?.MiniCard_Value}>{NumbertoCurrency(esipfdataOnMonth?.pf || 0)}</CustomText>
                     </View>

                     <View onTouchEnd={()=>issetIndividualOTModel(true)} style={[ChartStyle?.MiniCard,{backgroundColor:"#a159d9"}]}>
                      <CustomText style={ChartStyle?.MiniCard_Title}>Over Time</CustomText>
                      <CustomText style={ChartStyle?.MiniCard_Value}>{OtData?.OT}Hr</CustomText>
                      <CustomText style={[ChartStyle?.MiniCard_Value,{fontSize:14.5}]}>{NumbertoCurrency(OtData?.OTAMT || 0)}</CustomText>
                     </View>

                    
                     
                    
              </View>
           

            </View>

            
          </Animated.View>

          
{/*
  <Animated.View
  style={{
    opacity: animatedValue,
  }}
>
  <View style={[ChartStyle.ChartView, { justifyContent: "center" }]}>
    <CustomText style={[ChartStyle.MetricTitle,{marginLeft:10}]}> <TouchableOpacity onPress={()=>setyearWiseModal(true)} style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:10}}><Text style={ChartStyle?.MetricTitle}>Working Hours<MaterialCommunityIcons style={{borderRadius:30,padding:5}} name="filter-outline" size={15} color="#6d6d70" /></Text></TouchableOpacity></CustomText>
      <WorkingHoursChart isLoading={workingdatloading} data={getWorkingDays?.data} setscroll={setscroll}></WorkingHoursChart>
      <CustomText style={[ChartStyle.MetricTitle,{marginLeft:10,textAlign:"center",fontSize:10,marginTop:10}]}>Year : {Year}</CustomText> 
   </View>
</Animated.View>

*/
}
{
  workingdatloading ? <SkeletonLoader width={"100%"} height={"20%"} style={{textAlien:"center"}}></SkeletonLoader>
  :<Animated.View
  style={{
    opacity: animatedValue,
  }}
>
  <View style={[ChartStyle.ChartView]}>
    <CustomText style={[ChartStyle.MetricTitle,{marginLeft:1}]}> <TouchableOpacity onPress={()=>setyearWiseModal(true)} style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:10}}><Text style={ChartStyle?.MetricTitle}>Attendance Logs <MaterialCommunityIcons style={{borderRadius:30,padding:5}} name="filter-outline" size={15} color="#6d6d70" /></Text></TouchableOpacity></CustomText>
      <WorkingDaysChart isLoading={workingdatloading} data={getWorkingDays?.data} setscroll={setscroll}></WorkingDaysChart>
   <CustomText style={[ChartStyle.MetricTitle,{marginLeft:10,textAlign:"center",fontSize:10,marginTop:10}]}>Year : {Year}</CustomText>
   </View>
</Animated.View>

}


        

        

        <Animated.View
            style={{
              opacity: animatedValue,
            }}
          >
            <View style={[ChartStyle.ChartView, { justifyContent: "center"}]}>
            <Text style={[ChartStyle.MetricTitle,{marginLeft:10}]}> Loan Details</Text>
           <LoanProgressBar data={getLoan?.data}  ></LoanProgressBar>
            </View>
          </Animated.View>



      


{/*
        <Animated.View
            style={{
              opacity: animatedValue,
            }}
          >
            <View style={[ChartStyle.ChartView, { justifyContent: "center" }]}>
              <CustomText style={ChartStyle.MetricTitle}>profile Submission</CustomText>
              <WebView
                originWhitelist={['*']}
                source={{ html:htmlRadialBarContent }}
                style={{ height: chartHeight - 40, width: chartWidth - 40 }}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </View>
          </Animated.View>

          */}

          

       




       {/*   <Animated.View
            style={{
              opacity: animatedValue,
            }}
          >
            <View style={[ChartStyle.ChartView, { justifyContent: "center" }]}>
              <CustomText style={ChartStyle.MetricTitle}>Progress Chart</CustomText>
              <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={{ height: chartHeight - 40, width: chartWidth - 40 }}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </View>
          </Animated.View>*/}

         
        </View>
      </ScrollView>
    </View>
    </>
  );
}




