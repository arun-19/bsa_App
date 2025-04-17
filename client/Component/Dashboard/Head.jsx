import { View, Dimensions, StyleSheet, ScrollView, TouchableOpacity, Animated, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import NavBar from '../Navbar';
import WebView from 'react-native-webview';
import { AntDesign, FontAwesome, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import CustomText from '../Text/CustomText';
import { useGetCateogryToTSalaryQuery, useGetgendercountQuery, useGetTotalHeadCountQuery, useGetYearWiseToTSalaryQuery, useToTexpensesQuery } from '../../redux/service/misDashboardService';
import CustomDropdown from '../DropDown/CustomDropDown';
import PagerView from 'react-native-pager-view';
import { UserProfileCard } from './UserProfile';
import CustomizeProfile_Higher_Pos from './CustomizeProfile_Higher_Pos';
import FilterModel from '../FilterModal/FilterModel';
import CustomDropdownSelect from '../DropDownSelect/DropDownSelect';
import DepartMentWisalary from './Chart/Hod/DepartMentWiseSalary';
import ToTExpenses from './Chart/Hod/ToTExpenses';
import { useSelector } from 'react-redux';
import FilterAnimation from './Chart/Utils/FilterAnim';
import { CurrentMonthandYear, LastMonthandYear } from '../Utils/getCurrentMonth';
import WorkingDaysChart from './Chart/Employee/WorkingDays';
import GenderWiseStrength from './Chart/Hod/GenderWiseStrength';
import Employee from './Employee';

export default function  HeadofDepartMent({navigation}) {
  const [animatedValue] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const chartHeight = Dimensions.get('window').height * 0.3; 
  const chartWidth = screenWidth - 20;
  const {data}=useGetYearWiseToTSalaryQuery()
  const [OpenHeadCountModel,setOpenHeadCountModal]=useState(false)
  const [selectedDepartment,setSelectedDepartment]=useState()
  const [OpenPresentModal,setOpenPresntModal]=useState(false)
  const [OpenAbsentModal,setOpenAbsentModal]=useState(false)
  const [OpenCategoryWiseSalary,setOpenCategoryWiseSalary]=useState(false)
  const [cyear,setcyear]=useState()
  const [cMonth,setCMonth]=useState()

  const [tyear,settyear]=useState()
  const [tMonth,settMonth]=useState()
  const UserId=useSelector((state=>state?.UserDetails))
  
  

  const Boxchart = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
        <style>
        *{
        font-family: "Open Sans", sans-serif !important;
         font-style: normal;
         font-size:20px
        }
          .apexcharts-text, .apexcharts-legend-text, .apexcharts-title-text, .apexcharts-datalabel-label {
        font-family:"Open Sans", sans-serif !important;
      }

      /* Adjust font size of legend and labels if needed */
      .apexcharts-chart-text {
        font-size: 40px !important;
      }
      .apexcharts-title-text {
        font-size: 40px !important;
      }
      .apexcharts-datalabel-label {
        font-size: 50px !important;
      }
         
        </style>
      </head>
      <body>
        <div id="chart"></div>
        <script>
           
            
          var options = {
          series: [{
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        }, {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41]
        }],
          chart: {
          height: 550,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      
      

      </script>
      </body>
    </html>
  `;


  const htmlRadialBarContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
   <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
      <style>
      *{
      font-family: "Open Sans", sans-serif !important;
       font-style: normal;
      }
        .apexcharts-text, .apexcharts-legend-text, .apexcharts-title-text, .apexcharts-datalabel-label {
      font-family: ""Open Sans", sans-serif !important;
    }

    /* Adjust font size of legend and labels if needed */
    .apexcharts-legend-text {
      font-size: 40px !important;
    }
    .apexcharts-title-text {
      font-size: 40px !important;
    }
    .apexcharts-datalabel-label {
      font-size: 50px !important;
    }
       
      </style>
    </head>
    <body>
      <div id="Biechart"></div>
      <script>
    var options = {
  series: [44, 55, 41, 17, 15],
  chart: {
    type: 'donut',
    height:'600px'
  },
  labels: ['salaries', 'rent', 'utilities', 'marketing', 'insurance'], 
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '18px', // Customize the font size
      fontFamily: 'Arial, sans-serif', // Customize the font family
      fontWeight: 'light', // Customize the font weight
      colors: ['#696865'], // Set the label color
    },
    formatter: function (val, opts) {
      // Custom formatter for the label text
      return opts.w.globals.labels[opts.seriesIndex] + ': ' + Number(val).toFixed(2) + '%'; // Display category name and percentage
    },
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200,
      },
      legend: {
        position: 'center',
        
      },
    },
  }], legend: {
    position: 'right', // You can change position to 'top', 'bottom', 'left', or 'right'
    offsetY: 60, 
}
};

var chart = new ApexCharts(document.querySelector("#Biechart"), options);
chart.render();

    </script>
    </body>
  </html>
`;


  
  const barchart=` <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
       <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
        <style>
      * {
        font-family: "Open Sans", sans-serif !important;
        font-style: normal;
        font-size:30px !important;
      }
      .apexcharts-xaxis-label, .apexcharts-yaxis-label, .apexcharts-text, .apexcharts-tooltip-text {
        font-family: "Open Sans", sans-serif !important;
      }
        
        </style>
      </head>
      <body>
        <div id="Linechart"></div>
        <script>
         var options = {
          series: [
          {
            data: [-33, -13, -45, 95, 12, 15, -34, -61, 66, 82, 1, -36]
          }
        ],
          chart: {
          height: 590,width:"100%",
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        stroke: {
          width: 5,
          curve: "monotoneCubic"
        },
        plotOptions: {
          line: {
            colors: {
              threshold: 0,
              colorAboveThreshold: '#0088ee',
              colorBelowThreshold: '#ff0000',
            },
          },
        }
        };

        var chart = new ApexCharts(document.querySelector("#Linechart"), options);
        chart.render();
      
      </script>
      </body>
    </html>
`
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
      justifyContent: "center",
      fontFamily: "Dosis-Regular",
    },
    ChartContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems:"center",
      gap: 10,
      paddingBottom: 10,
      paddingTop:12,
    }, page: {
      justifyContent: 'center',
      alignItems: 'center',
      flex:1
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
      borderRadius: 12,
      padding: 15,
      marginBottom: 5,
      width: (screenWidth - 40) / 2,
      shadowColor: '#c3c2c4',
      shadowOffset: { width: 20, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 100,
      rowGap: 1,
      justifyContent: 'center',
      alignItems: 'center',paddingBottom:35,
      zIndex:20
    },
    MetricTitle: {
      fontSize: 14,
      fontFamily:"Dosis-Bold",
      fontWeight:"900",
      color: '#6d6d70',
      marginBottom: 3,
    }, MetricTitle_card: {
      fontSize: 14,
      fontFamily:"Dosis-Bold",
      fontWeight:"bold",
      color: 'black',
      marginBottom: 10,
      
    },
    MetricValue: {
      fontSize: 20,
      color: '#6b6e70',
      fontWeight:"600"
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
  },
  genderBreakdown: {
    flexDirection: "column",
    justifyContent: 'space-between',
    marginVertical: 4,
    marginHorizontal:15,
    gap:10
  },
  genderCount: {
    fontSize: 17,
    fontWeight: '900',
    color: '#444',
  },
  })

 /* const UserProfile=StyleSheet.create({
    UserDetailContainer:{
      padding:0,
      marginBottom:-23,
      position:"relative"
      
    },ImageContainer:{
     padding:2,
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    },BlurView:{
      position:"absolute",
      backgroundColor:"rgba(240, 238, 238, 0.9)",
      width:"90%",
      bottom:29,
      borderRadius:30,
      padding:8
      
    },BlurViewText:{
      marginLeft:25,
      marginBottom:3,
      
    }
  })
*/

const {data:TotalHead,isLoading:TotalHeadLoading,isError,error}=useGetTotalHeadCountQuery()
const {data:getCateogryWiseSalary,isLoading:getCateogryWiseisLoading}=useGetCateogryToTSalaryQuery({params:{payperiod:cMonth && cyear ? cMonth+" "+cyear : LastMonthandYear}})

const {data:getToTExpenses,isLoading:getToTExpensesisLoading}=useToTexpensesQuery({params:{payperiod:tMonth && tyear ? tMonth+" "+tyear : LastMonthandYear}})
const {data:getGenderCount,isLoading:getGenderCountLoading}=useGetgendercountQuery({params:{COMPCODE:UserId?.GCOMPCODE}})


// if(isError) alert(JSON?.stringify(error.message))

if(TotalHeadLoading) return <View><CustomText>Loading....</CustomText></View>

const TotalDepartment=TotalHead?.data && TotalHead.data?.reduce((cum,acc)=>Number(cum)+Number(acc.value),0)

  
  return (<>
  <View style={{position:"absolute"}}> 
    {/*Only for Modal Contant */}
    <FilterModel close="direct" modalVisible={OpenHeadCountModel} setModalVisible={setOpenHeadCountModal}  name="Head Count Filter">
     <CustomDropdownSelect close="direct" setCloseModal={setOpenHeadCountModal} items={TotalHead?.data} selectedValue={selectedDepartment} setSelectedValue={setSelectedDepartment} ></CustomDropdownSelect>
    </FilterModel>
{/* Total Present */}
    <FilterModel modalVisible={OpenPresentModal} setModalVisible={setOpenPresntModal}  name="Total Present filter">
     <CustomDropdownSelect placeholder={"select Gender"} items={[
               { label: 'Male Wise', value: 'male' },
               { label: 'Female', value: 'femal' },
             ]} selectedValue={selectedDepartment} setSelectedValue={setSelectedDepartment} ></CustomDropdownSelect>

              <CustomDropdownSelect placeholder={"select department"} items={[
              { label: 'All', value: 'All' },
              { label: 'Merchandising', value: 'Merchandising' },
              { label: 'Marketing', value: 'Marketing' },
              { label: 'Exports', value: 'Exports' },
              { label: 'Materials', value: 'Materials' },
              { label: 'Production', value: 'Production' },
            ]} selectedValue={selectedDepartment} setSelectedValue={setSelectedDepartment} ></CustomDropdownSelect>
    </FilterModel>

    <FilterModel modalVisible={OpenAbsentModal} setModalVisible={setOpenAbsentModal}  name="Total Absent filter">
     <CustomDropdownSelect placeholder={"select Gender"} items={[
               { label: 'Male Wise', value: 'male' },
               { label: 'Female', value: 'femal' },
             ]} selectedValue={selectedDepartment} setSelectedValue={setSelectedDepartment} ></CustomDropdownSelect>
        <CustomDropdownSelect placeholder={"select department"} items={[
               { label: 'All', value: 'All' },
               { label: 'Merchandising', value: 'Merchandising' },
               { label: 'Marketing', value: 'Marketing' },
               { label: 'Exports', value: 'Exports' },
               { label: 'Materials', value: 'Materials' },
               { label: 'Production', value: 'Production' },
             ]} selectedValue={selectedDepartment} setSelectedValue={setSelectedDepartment} ></CustomDropdownSelect>
    </FilterModel>


    <FilterModel modalVisible={OpenCategoryWiseSalary} setModalVisible={setOpenCategoryWiseSalary}  name="Category Wise Salary">
     <CustomDropdownSelect placeholder={"select Year"} isyear={true} selectedValue={cyear} setSelectedValue={setcyear} ></CustomDropdownSelect>
     <CustomDropdownSelect placeholder={"select Year"} ismonth={true} selectedValue={cMonth} setSelectedValue={setCMonth} ></CustomDropdownSelect>
    </FilterModel>

    </View>

 
  
  <PagerView style={{flex:1,height:"100%",width:"100%",padding:0}}  initialPage={0}>
 
    
    <View style={ChartStyle.page} key="1">
       
    <View style={{ flex: 1, padding: 15, backgroundColor: '#f0f0f0', width: "100%" }}>
 
     
   
   {/*   <View style={[UserProfile?.UserDetailContainer,{width:"100%",height:"40%"}]} >
           <View style={UserProfile?.ImageContainer}>
            <Image width={"98%"} height={"90%"} style={{objectFit:"cover",borderRadius:19,opacity:.9}} source={{uri:"https://www.shutterstock.com/image-photo/young-smiling-successful-employee-business-600nw-2358608485.jpg"}}></Image>
            <View style={UserProfile?.BlurView}>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><CustomText style={[UserProfile?.BlurViewText,{fontSize:20,fontWeight:"bold"}]}> Harish</CustomText><CustomText style={[UserProfile?.BlurViewText,{fontSize:10,margin:10,fontWeight:"bold"}]}>20203003</CustomText></View>
              
              <CustomText style={UserProfile?.BlurViewText}>+91 6382158436</CustomText>
              <CustomText style={UserProfile?.BlurViewText}> Supervisor</CustomText>
            </View>
            </View>
      </View>*/}
    
    
      <ScrollView 
       showsVerticalScrollIndicator={false}
      alwaysBounceVertical style={{ padding: 1, width: "100%" ,top:0,
        scrollbarThumbVertical: 'red', // Thumb color (Android only)
         scrollbarTrackVertical: '#f0f0f0',
          // Track color (Android only)
              }}>
   
        {/* Metrics Section */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 10 ,paddingTop:0}}>

{/* Headcount Card */}
<View style={[ChartStyle.MetricCard, {
  flexBasis: '100%',
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 20,
  marginBottom: 16,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3
}]}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <CustomText style={[ChartStyle.MetricTitle_card, { fontSize: 18 }]}>Total HeadCount</CustomText>
    <Text
      onPress={() => setOpenHeadCountModal(true)}
      style={{
        backgroundColor: '#f5eeeb',
        padding: 8,
        borderRadius: 8,
        marginLeft:10
      }}
    >
      <AntDesign name="filter" size={20} color="#c44404" />
    </Text>
  </View>
  <CustomText style={[ChartStyle.MetricValue, { fontSize: 12, color: '#777', marginTop: 4 }]}>
    {selectedDepartment?.label || "Total Members"}
  </CustomText>
  <CustomText style={[ChartStyle.MetricValue, { fontSize: 28, fontWeight: 'bold', marginTop: 2 }]}>
    {selectedDepartment?.value || TotalDepartment}
  </CustomText>
</View>

{/* Present + Absent Cards (side by side) */}
<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
  
  {/* Present Card */}
  <View style={[ChartStyle.MetricCard, {
    flexBasis: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  }]}>
    <CustomText style={[ChartStyle.MetricTitle_card, { fontSize: 18 }]}>Total Present</CustomText>
    <View style={{ marginTop: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <Fontisto name="male" size={20} color="#9c22e3" style={{ marginRight: 6 }} />
        <CustomText style={{ fontSize: 16, color: '#333' }}>2 <Text style={{ fontWeight: '300', fontSize: 14 }}>Male</Text></CustomText>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Fontisto name="female" size={20} color="#22b3e3" style={{ marginRight: 6 }} />
        <CustomText style={{ fontSize: 16, color: '#333' }}>1 <Text style={{ fontWeight: '300', fontSize: 14 }}>Female</Text></CustomText>
      </View>
    </View>
  </View>

  {/* Absent Card */}
  <View style={[ChartStyle.MetricCard, {
    flexBasis: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10
  }]}>
    <CustomText style={[ChartStyle.MetricTitle_card, { fontSize: 18,color:"red" }]}>Total Absent</CustomText>
    <View style={{ marginTop: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <Fontisto name="male" size={20} color="#9c22e3" style={{ marginRight: 6 }} />
        <CustomText style={{ fontSize: 16, color: '#333' }}>2 <Text style={{ fontWeight: '300', fontSize: 14 }}>Male</Text></CustomText>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Fontisto name="female" size={20} color="#22b3e3" style={{ marginRight: 6 }} />
        <CustomText style={{ fontSize: 16, color: '#333' }}>1 <Text style={{ fontWeight: '300', fontSize: 14 }}>Female</Text></CustomText>
      </View>
    </View>
  </View>

</View>
</View>


      



        {/* Charts Section */}
        <View style={ChartStyle.ChartContainer}>


        <Animated.View
            style={{
              opacity: animatedValue,
            }}
          >
            <View style={[ChartStyle.ChartView, { justifyContent: "center" }]}>
              <CustomText style={ChartStyle.MetricTitle}>Insentives
              </CustomText>
              <WebView
                originWhitelist={['*']}
                source={{ html:Boxchart}}
                style={{ height: chartHeight - 40, width: chartWidth - 40 }}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </View>

            
          </Animated.View>



          <Animated.View
            style={{
              opacity: animatedValue,
            }}
          >
            <View style={[ChartStyle.ChartView, { justifyContent: "center" }]}>
              
    <CustomText style={[ChartStyle.MetricTitle,{marginLeft:1}]}> <TouchableOpacity onPress={()=>setyearWiseModal(true)} style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:10}}><Text style={ChartStyle?.MetricTitle}> Gender Count<MaterialCommunityIcons style={{borderRadius:30,padding:5}} name="filter-outline" size={15} color="#6d6d70" /></Text></TouchableOpacity></CustomText>
      <GenderWiseStrength isLoading={getGenderCountLoading} data={getGenderCount?.data}  UserId={UserId} ></GenderWiseStrength>
   </View>
</Animated.View>
          

        <Animated.View
            style={{
              opacity: animatedValue,
            }}
          >
            <View style={[ChartStyle.ChartView, { justifyContent: "center" }]}>
              <CustomText style={[ChartStyle.MetricTitle,{marginBottom:0}]}>Expenses
              </CustomText>
             <ToTExpenses data={getToTExpenses?.data} isLoading={getToTExpensesisLoading}></ToTExpenses>
            </View>

            
          </Animated.View>

        <Animated.View
            style={{
              opacity: animatedValue,
            }}
          >
            <View style={[ChartStyle.ChartView, { justifyContent: "center" }]}>
               <CustomText style={[ChartStyle.MetricTitle,{marginLeft:1}]}> <TouchableOpacity  onPress={()=>setOpenCategoryWiseSalary(true)}  style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:10}}><Text style={ChartStyle?.MetricTitle}>Category Wise Salary  Distribution <MaterialCommunityIcons style={{borderRadius:30,padding:5}} name="filter-outline" size={15} color="#6d6d70" /></Text></TouchableOpacity></CustomText>
                {OpenCategoryWiseSalary ? <FilterAnimation></FilterAnimation>: <DepartMentWisalary data={getCateogryWiseSalary?.data} isLoading={getCateogryWiseisLoading}></DepartMentWisalary>}
                <CustomText style={{textAlign:"center"}}> {cMonth && cyear ? cMonth+" "+cyear : LastMonthandYear} </CustomText>
                 </View>
          
             
          </Animated.View>
       


          

          

       




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

    </View>

    <View style={[ChartStyle.page,{justifyContent:"flex-start",padding:7,marginTop:-15}]} key="2">
      <CustomText style={{fontWeight:"bold",fontSize:20,marginTop:10,paddingBottom:8}} ><AntDesign name="user" size={24} color="black" /> My Profile </CustomText>
      <Employee></Employee>
    </View>
    </PagerView>
    </>
  );
}
