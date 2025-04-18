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
  var value=[];


  if(data?.length>0){
    data?.forEach((data)=>{
        label.push(`'${data[0]}'`)
        value.push(data[1])

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
        font-size:24px !important;
        

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
          series: [{
          data: [${value || []}]
        }],
          chart: {
          type: 'bar',
         height: "${chartHeight+600}"
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories:  [${label || []}],
        },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        yaxis: {
          axisTicks: {
            show: true
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