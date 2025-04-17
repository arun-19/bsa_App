
import React, { useState } from 'react'
import { Alert, Dimensions, View } from 'react-native';
import WebView from 'react-native-webview'
import CommonModal from '../../../Modal/CommonModal';
import AllMonth from "../Month"
import DailyInOutBody from '../_Modal_BodyComponents/DailyInOutBody';


function GenderWiseStrength({data,setscroll,isLoading:GetDataLoad,UserId,year}) {
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
        label.push(`'${data[0]}'`)
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
              columnWidth: '35%',
              distributed: true,
              padding:20,
              
              
            }, 
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '35px',
              fontWeight: 'bold',
              colors: ['#fff']
            },
  formatter: function (val, opts) {
    const labels = opts.w.globals.labels;
    const gender = labels[opts.dataPointIndex];
    const icon = gender === "Male" ? "👨" : "👩"; // Emoji icons
    return icon+""+val;
  }
          },
          series: [{
            name: 'Count',
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
          "#03A9F4", "#4CAF50"
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






  return (<>

    <WebView
    originWhitelist={['*']}
    source={{ html:linechart }}
    style={{ height: chartHeight - 40, width: chartWidth - 40 }}
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

export default GenderWiseStrength