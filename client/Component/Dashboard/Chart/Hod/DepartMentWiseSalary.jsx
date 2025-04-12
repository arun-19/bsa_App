import React, { useEffect, useState } from 'react'
import { Alert, Dimensions } from 'react-native';
import WebView from 'react-native-webview'
import CustomText from '../../../Text/CustomText';

function DepartMentWisalary({data,setscroll,isLoading:GetDataLoad}) {
const [isLoading, setIsLoading] = useState(false);
const screenWidth = Dimensions.get('window').width;
  const chartHeight = Dimensions.get('window').height * 0.3; 
  const chartWidth = screenWidth - 20;

  var label=[];
  var value="";


   
    if(data?.length>0){
      data?.forEach((data,index)=>{
        if(index==0)
         value=value+`{x:'${data?.DESIGNATION}',y:${data?.NETPAY}}`
        else
          value=value+`,{x:'${data?.DESIGNATION}',y:${data?.NETPAY}}`
      })
  
    }
   


  
  


 






  const funnel=` <!DOCTYPE html>
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
        font-size:20px !important;
        

      }
      .apexcharts-xaxis-label, .apexcharts-yaxis-label, .apexcharts-text, .apexcharts-tooltip-text {
        font-family: "Open Sans", sans-serif !important;
        
      }
        
        </style>
      </head>
      <body>
        <div id="chart"></div>
        <script>
      
        var options = {
          series:[{
          data:[${value || []}]    
          
              }]
        ,
          legend: {
          show: false
        },
        chart: {
          height: 780,
          type: 'treemap'
        },

         plotOptions: {
            treemap: {
              colors: '#c5a7d6',  // Custom colors for the boxes
              enableShades: true,
              distributed: false,  // Optional, makes the colors apply differently to each segment
              label: {
                show: true,
                formatter: function(value) {
                  return value.x + ' - ' + value.y; 
                }
              }
            }
           }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    
      </script>
      </body>
    </html>
`



    



  return (
    <WebView
    originWhitelist={['*']}
    source={{ html:funnel }}
    style={{ height: chartHeight+40, width: chartWidth - 40 }}
    onLoadStart={() => setIsLoading(true)}
    onLoadEnd={() => setIsLoading(false)}
    onError={() => setIsLoading(false)}
  />
  )
}

export default DepartMentWisalary