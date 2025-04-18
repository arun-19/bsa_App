
import React, { useState } from 'react'
import { Alert, Dimensions, View } from 'react-native';
import WebView from 'react-native-webview'
import CommonModal from '../../../Modal/CommonModal';
import AllMonth from "../Month"
import DailyInOutBody from '../_Modal_BodyComponents/DailyInOutBody';


function WorkingDaysChart({data,setscroll,isLoading:GetDataLoad,UserId,year}) {
const [isLoading, setIsLoading] = useState(false);
const [showDaysInOutModal,setshowDaysInOutModal]=useState(false)
const [selectedMonth,setSelectedMonth]=useState()
const screenWidth = Dimensions.get('window').width;
  const chartHeight = Dimensions.get('window').height * 0.3; 
  const chartWidth = screenWidth - 20;
  var label=[];
  var value=[];


  if(data?.length>0){
    data?.forEach((data)=>{
        label.push(`'${data[0].split(" ")[0].slice(0,3)}'`)
        value.push(data[1])

    })

  }




  const linechart=` <!DOCTYPE html>
  <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
      <style>
        * {
          font-family: "Open Sans", sans-serif;
          font-size: 25px !important;
        }
  
        body {
         
          display: flex;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
  
        #chart {
          max-width: 900px;
          width: 100%;
          background: white;
          border-radius: 15px;
       
        }
  
        .apexcharts-xaxis-label,
        .apexcharts-yaxis-label,
        .apexcharts-text,
        .apexcharts-tooltip-text {
          font-family: "Open Sans", sans-serif !important;
        }
  
        .apexcharts-toolbar button {
          font-size: 25px !important;
          padding: 10px;
          min-width: 60px !important;
        }
      </style>
    </head>
    <body>

      <div id="chart"></div>

  
      <script>

       document.addEventListener("DOMContentLoaded", function () {
        var options = {
          chart: {
            type: 'bar',
            height: 550,
            width:'100%',
            toolbar: {
              show: true
            },
            events: {
             dataPointSelection: function(event, chartContext, config) {
                 category = config.w.config.xaxis.categories[config.dataPointIndex]
                 value= config.w.config.series[0].data[config.dataPointIndex]
                 
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    category: category,
                    value: value
                  }));
                
              }
           }
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              columnWidth: '70%',
              distributed: true,
            }, 
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '35px',
              fontWeight: 'bold',
              colors: ['#fff']
            }
          },
          series: [{
            name: 'Working Days',
            data: [${value || []}]
          }],
          xaxis: {
            categories:  [${label || []}],
            labels: {
              style: {
                fontSize: '25px'
              }
            }
          },
          colors: [
            "#00E396", "#FEB019", "#FF4560", "#775DD0", "#3F51B5", "#03A9F4", "#4CAF50"
          ],
          tooltip: {
            theme: 'dark',
            style: {
              fontSize: '25px'
            }
          },
          grid: {
            borderColor: '#e0e6ed',
            row: {
              colors: ['#f9f9f9', 'transparent'],
              opacity: 0.5
            }
          },
        };
  
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
});
      </script>
    </body>
  </html>
  
  `





    const barchart=` <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=Delius&display=swap" rel="stylesheet">
        <style>
      * {
         
        font-family: "Delius", cursive !important;
        font-style: normal;
        font-size:28px !important;
        padding:0;
      }
      .apexcharts-xaxis-label, .apexcharts-yaxis-label, .apexcharts-text, .apexcharts-tooltip-text {
            font-family: "Delius", cursive !important;
      }

      .apexcharts-toolbar button {
          font-size: 20px !important; /* Adjust size of icons */
          padding: 10px;   /* Add padding around the icons */
          min-width: 60px !important; /* Set minimum width */
        }

        .apexcharts-toolbar svg {
          width: 90px !important;  /* Increase icon size */
          height: 90px !important; /* Increase icon size */
        }

        .apexcharts-legend-text {
          font-size: 30px !important;
        }
        
        </style>
      </head>
      <body>
        <div id="Linechart"></div>
        <script>


         var options = {
          series: [
          {
          name:"Days",
            data: [${value || []}]
          }
        ],
          chart: {
          height: "100%",width:"90%",
          type: 'line',
          zoom: {
            enabled: false,
             pan: {
          enabled: false  // Disable pan/scroll actions
        
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: [${label || []}],
        },
        stroke: {
          width: 5,
          curve: "monotoneCubic",
           colors: [function({ value }) {
            return value < 24 ? 'red' : '#0088EE';
        }]
        }, markers: {
    colors: [function({ value }) {
      return value < 24 ? 'red' : '#0088EE';
    }]
  },
        plotOptions: {
          line: {
            colors: {
              threshold: 0,
              colorAboveThreshold: '#49a9f2',
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

  return (<>
  <View style={{position:"absolute"}}>  <CommonModal  height={"70%"}  isModalVisible={showDaysInOutModal} BodyComponent={<DailyInOutBody UserId={UserId?.UserId} payperiod={selectedMonth+" "+year} COMPCODE={UserId?.GCOMPCODE}></DailyInOutBody>} setIsModalVisible={setshowDaysInOutModal} Title='Days List'></CommonModal></View>
    <WebView
    originWhitelist={['*']}
    source={{ html:linechart }}
    style={{ height: chartHeight-40 , width: chartWidth - 10,alignSelf:"flex-start"}}
    onLoadStart={() => setIsLoading(true)}
    onLoadEnd={() => setIsLoading(false)}
    onError={() => setIsLoading(false)}
    javaScriptEnabled={true}  
    domStorageEnabled={true}
    startInLoadingState={true}
    scalesPageToFit={true}
    onMessage={(event) => {
      try {
        const messageData =JSON.parse( event?.nativeEvent?.data)
         var Month= AllMonth?.find((data)=>data?.slice(0,3)==messageData?.category)
         setSelectedMonth(Month)
        setshowDaysInOutModal(true)
      } catch (e) {
        console.error("Error parsing WebView message:", e);
      }
    }}
  />
  </>
  )
}

export default WorkingDaysChart