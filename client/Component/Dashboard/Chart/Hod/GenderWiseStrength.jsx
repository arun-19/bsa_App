
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




  const linechart = `
  <!DOCTYPE html>
  <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
      <style>

      * {
        font-family: "Open Sans", sans-serif !important;
        font-style: normal;
        font-size:27px !important;
        

      }
        body {
          margin: 0;
          padding: 0;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      
          @keyframes rotateIn {
    from {
      transform: rotate(-180deg) scale(0.5);
      opacity: 0;
    }
    to {
      transform: rotate(0deg) scale(1);
      opacity: 1;
    }
  }
      </style>
    </head>
    <body>
      <div id="chart" ></div>
      <script>
        document.addEventListener("DOMContentLoaded", function () {
        
        var options = {
          series: [${value || []}],
          chart: {
          width:"${chartWidth+400}",
          
          type: 'donut',
           animations: {
    enabled: true,
    easing: 'easeinout',
    speed: 800,
    animateGradually: {
      enabled: true,
      delay: 150
    },
    dynamicAnimation: {
      enabled: true,
      speed: 350
    }
       },  animations: {
                  enabled: true,
                  easing: 'easeinout',
                  speed: 800,
                  animateGradually: { enabled: true, delay: 150 },
                  dynamicAnimation: { enabled: true, speed: 350 }
                }
        },
        labels: [${label || []}],
         colors: ['#9c22e3', '#22b3e3'],
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270
          }
        },
        dataLabels: {
          enabled: true
        },
        fill: {
          type: 'gradient',
        },
        legend: {
        position:'bottom',
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
        },
        responsive: [{
          breakpoint: 490,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: 'left'
            }
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
        });
      </script>
    </body>
  </html>
  `;
  
  






  return (<>

<WebView
  originWhitelist={['*']}
  source={{ html: linechart }}
  style={{ height: chartHeight-40, width: chartWidth-40, backgroundColor: 'transparent' }}
  javaScriptEnabled={true}
  domStorageEnabled={true}
  startInLoadingState={true}
  onLoadStart={() => setIsLoading(true)}
  onLoadEnd={() => setIsLoading(false)}
  onError={() => setIsLoading(false)}
  onMessage={(event) => {
    try {
      const messageData = JSON.parse(event?.nativeEvent?.data);
      const Month = AllMonth?.find(m => m?.slice(0, 3) === messageData?.category);
      setSelectedMonth(Month);
      setshowDaysInOutModal(true);
    } catch (e) {
      console.error("Error parsing WebView message:", e);
    }
  }}

  
/>

  </>
  )
}

export default GenderWiseStrength