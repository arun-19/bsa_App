import { View, Dimensions, StyleSheet, ScrollView, TouchableOpacity, Animated, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import NavBar from '../Navbar';
import WebView from 'react-native-webview';
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CustomText from '../Text/CustomText';
import { useGetYearWiseToTSalaryQuery } from '../../redux/service/misDashboardService';
import CustomDropdown from '../DropDown/CustomDropDown';
import PagerView from 'react-native-pager-view';
import { UserProfileCard } from './UserProfile';
import CustomizeProfile_Higher_Pos from './CustomizeProfile_Higher_Pos';
import FilterModel from '../FilterModal/FilterModel';
import CustomDropdownSelect from '../DropDownSelect/DropDownSelect';

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
          name: 'Inflation',
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }],
          chart: {
          height: 550,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'center', // top, center, bottom
            },
            colors: {
              backgroundBarColors: ['#fafcfc'],
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '14px',
            colors: ["#304758"]
          }
        },
        
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#32a14f',
                colorTo: '#5fb6e8',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            }
          }
        
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


  
  const Revenue_linechart=` <!DOCTYPE html>
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
          series: [{
          name: '2024',
          data: [31, 40, 28, 51, 42, 109, 100]
        }, {
          name: '2025',
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
          type: 'text',
          categories: ["jan","feb","mar","apr","june","jul","aug"]
        },
        tooltip: {
         
        },
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
      marginBottom: 10,
    }, MetricTitle_card: {
      fontSize: 14,
      fontFamily:"Dosis-Bold",
      fontWeight:"900",
      color: 'white',
      marginBottom: 10,
    },
    MetricValue: {
      fontSize: 24,
      color: 'white',
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
  }
  });

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


  
  return (<>
  <View style={{position:"absolute"}}> 
    {/*Only for Modal Contant */}
    <FilterModel modalVisible={OpenHeadCountModel} setModalVisible={setOpenHeadCountModal}  name="Head Count Filter">
     <CustomDropdownSelect items={[
               { label: 'Merchandising', value: 'Merchandising' },
               { label: 'Marketing', value: 'Marketing' },
               { label: 'Exports', value: 'Exports' },
               { label: 'Materials', value: 'Materials' },
               { label: 'Production', value: 'Production' },
             ]} selectedValue={selectedDepartment} setSelectedValue={setSelectedDepartment} ></CustomDropdownSelect>
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
    </View>

  <NavBar />
  
  <PagerView style={{flex:1,height:"100%",width:"100%",padding:0}}  initialPage={0}>
 
    
    <View style={ChartStyle.page} key="1">
       
    <View style={{ flex: 1, padding: 15, backgroundColor: '#f0f0f0', width: "100%" }}>
      
      <TouchableOpacity style={ChartStyle.fab}  onPress={()=>{navigation.navigate("HOME")}}>
        <Ionicons name="home" size={20} style={{paddingLeft:8}} color="#a4a0ad" />
      </TouchableOpacity>
   
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
      alwaysBounceVertical style={{ padding: 1, width: "100%" , 
        scrollbarThumbVertical: 'red', // Thumb color (Android only)
         scrollbarTrackVertical: '#f0f0f0',
          // Track color (Android only)
              }}>

        {/* Metrics Section */}
        <View  style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
        
          <View style={[ChartStyle.MetricCard,{backgroundColor:"#91a5d9"}]}>
             <View style={{flexDirection:"row",gap:40}}> <Text onPress={()=>setOpenHeadCountModal(true)} style={{position:"absolute",top:-70,left:47,backgroundColor:"#e1e4e8",padding:2,borderRadius:10}}><AntDesign name="filter" size={24} color="black" style={{textAlign:"center"}} /></Text></View>
            <CustomText style={ChartStyle.MetricTitle_card}>Dept HeadCount</CustomText>
            <CustomText style={ChartStyle.MetricValue}>2200</CustomText>
           {/* <TouchableOpacity style={ChartStyle.Button}>
              <CustomText style={{ color: '#fff' }}>View Details</CustomText>
            </TouchableOpacity>*/}
          </View>

          <View  style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <View style={[ChartStyle.MetricCard,{shadowColor:'#afc0db',backgroundColor:"#cbcacf",position:"relative",zIndex:-10}]}>
          <Text style={{position:"absolute",top:4,left:"99%",backgroundColor:"#e1e4e8",padding:2,borderRadius:10}} onPress={()=>setOpenPresntModal(true)}><MaterialCommunityIcons name="account-filter-outline" size={24} color="black" /></Text>
            <CustomText style={[ChartStyle.MetricTitle_card]}>Total Present</CustomText>
            <CustomText style={[ChartStyle.MetricValue]}>20Male</CustomText>
           {/* <TouchableOpacity style={ChartStyle.Button}>
              <CustomText style={{ color: '#fff' }}>View Details</CustomText>
            </TouchableOpacity>*/}
          </View>
          <View style={[ChartStyle.MetricCard,{backgroundColor:"#cbcacf"}]}>
          <Text style={{position:"absolute",top:4,left:"99%",backgroundColor:"#e1e4e8",padding:2,borderRadius:10}} onPress={()=>setOpenAbsentModal(true)}><MaterialIcons name="leave-bags-at-home" size={24} color="black" /></Text>
            <CustomText style={ChartStyle.MetricTitle_card}>Total Absent</CustomText>
            <CustomText style={ChartStyle.MetricValue}> 2Male</CustomText>
           {/* <TouchableOpacity style={ChartStyle.Button}>
              <CustomText style={{ color: '#fff' }}>View Details</CustomText>
            </TouchableOpacity>*/}
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
              <CustomText style={ChartStyle.MetricTitle}>Revenue</CustomText>
              <WebView
                originWhitelist={['*']}
                source={{ html: Revenue_linechart }}
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
              <CustomText style={ChartStyle.MetricTitle}>Expenses
              </CustomText>
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

    <View style={[ChartStyle.page,{justifyContent:"flex-start",padding:7}]} key="2">
      <CustomizeProfile_Higher_Pos></CustomizeProfile_Higher_Pos>
    </View>
    </PagerView>
    </>
  );
}
