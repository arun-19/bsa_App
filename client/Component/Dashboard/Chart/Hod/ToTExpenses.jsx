import React, { useState } from 'react'
import { Alert, Dimensions } from 'react-native';
import WebView from 'react-native-webview'
import CustomText from '../../../Text/CustomText';

function  ToTExpenses({data,setscroll,isLoading:GetDataLoad}) {
const [isLoading, setIsLoading] = useState(false);
const screenWidth = Dimensions.get('window').width;
  const chartHeight = Dimensions.get('window').height * 0.3; 
  const chartWidth = screenWidth - 20;

  var label=[];
  var value=[];


  if(data?.length>0){
    data?.forEach((data)=>{
        label.push(`'Salaries'`)
        value.push(Number(data[0]))

    })

  }






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
          series: [${data ? data[0][0]: 0}, 3765533, 5256563, 5856653, 655653],
          chart: {
          width: '100%',
          type: 'polarArea',
        },
        labels: ['salaries', 'Rent', 'Depreciation', 'Travel expenses', 'Production expenses'],
        fill: {
          opacity: 1
        },
        stroke: {
          width: 5,
          colors: undefined
        },
        yaxis: {
          show: false
        },
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            },
            spokes: {
              strokeWidth: 0
            },
          }
        },
        theme: {
          monochrome: {
            enabled: true,
            shadeTo: 'light',
            shadeIntensity: 0.6
          }
        }
        };

        var chart = new ApexCharts(document.querySelector("#Biechart"), options);
        chart.render();
      

    </script>
    </body>
  </html>
`;




    



  return (
    <WebView
    originWhitelist={['*']}
    source={{ html:htmlRadialBarContent }}
    style={{ height: chartHeight+60, width: chartWidth - 40,padding:0}}
    onLoadStart={() => setIsLoading(true)}
    onLoadEnd={() => setIsLoading(false)}
    onError={() => setIsLoading(false)}
  />
  )
}

export default ToTExpenses