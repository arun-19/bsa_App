import React, { useLayoutEffect, useState } from 'react'
import { View ,Text, StyleSheet, ScrollView} from 'react-native'
import CustomDropdownSelect from '../../../DropDownSelect/DropDownSelect'
import { EsiandPFBodyStyle } from '../Style/EsiPfStyle'
import CustomText from '../../../Text/CustomText'
import { useGetEachOverTimeWagesQuery, useGetOverTimeQuery, useGetOverTimeWagesQuery } from '../../../../redux/service/misDashboardService'
import { NumbertoCurrency } from '../../../Utils/NumberToCurrency'


function OTIndividualModalBody({CurrentOTAmt,CurrentYearandMonth,UserId}) {

  const styles=StyleSheet?.create({
    tableContainer: {
      
      paddingBottom: 1,
      margin: 0,
      borderWidth: 1,
      borderColor: '#ddd',
      width: "100%",
      overflowY:"scroll"
    
  },
  row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#ddd',
  },
  evenRow: {
      backgroundColor: '#f9f9f9',
  },
  oddRow: {
      backgroundColor: '#ECECEC',
  },
  headerRow: {
      backgroundColor: '#2F303C',
      borderTopWidth: 1,
  },
  cell: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 1,
      borderColor: '#ddd',
      paddingVertical: 4,
  },
  headerText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 14,
      color:"white"
  },
  cellText: {
      textAlign: 'right',
      fontSize: 16,
      fontWeight:"800"
  },
  cellNumber: {
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 12,
      borderRightWidth: 1,
      borderColor: '#ddd',
  },
  dueDaysWarning: {
      color: 'red',
      fontSize: 12,
      textAlign: 'right',
  },
  cellNum: {
      alignItems: 'center',
      textAlign: 'right',
      fontSize: 12,
  },
  dropdownCon: {
      flex: 1,
      flexDirection: "column"
  }
  
  })
 
   
    const [Otyear,setOtyear]=useState()
    const [OtMonth,setOtMonth]=useState()

    var OTpfEsiPayperiod=OtMonth  && Otyear ? OtMonth+" "+Otyear : CurrentYearandMonth
   
  useLayoutEffect(() => {
    const year=CurrentYearandMonth?.split(" ")[1]
    const Month=CurrentYearandMonth?.split(" ")[0]

    setOtyear(year)
    setOtMonth(Month)
   
  }, [])

  const {data:OverTimedata,isLoading:IsOverTimeLoading}=useGetOverTimeQuery({params:{
    Idcard:UserId?.UserId,payperiod:OTpfEsiPayperiod,COMPCODE:UserId?.GCOMPCODE
  }})

  

  const  OtData=OverTimedata?.data ? OverTimedata?.data?.reduce(function (acc, obj) { return {OTAMT:acc.OTAMT + obj.OTAMT,OT:acc.OT + obj.OT} }, {OTAMT:0,OT:0}) : {}

 

  return (
    <View style={{height:"100%"}}>  
       
     
<View style={[EsiandPFBodyStyle?.EsipfContainer]}>
    <View style={{flexDirection:"row",width:"100%",gap:10}}>
<CustomDropdownSelect   placeholder={"select Year"} isyear={true} selectedValue={Otyear } setSelectedValue={setOtyear} ></CustomDropdownSelect>
<CustomDropdownSelect placeholder={"select Year"} ismonth={true} selectedValue={OtMonth } setSelectedValue={setOtMonth} ></CustomDropdownSelect>

</View>
<CustomText style={EsiandPFBodyStyle?.Datetext}>OT  On : { Otyear ? OtMonth+" "+Otyear : CurrentYearandMonth}</CustomText>
<ScrollView horizontal stickyHeaderIndices={[0]} style={{height:"70%",width:"100%"}} >
<View style={styles.tableContainer}>
             <View style={[styles.row, styles.headerRow]}>
                    <View style={[styles.cell, { width: 30 }]}>
                        <Text style={styles.headerText}>Sno</Text>
                    </View>
                    <View style={[styles.cell, { width: 100 }]}>
                        <Text style={styles.headerText}>Date</Text>
                    </View>

                    <View style={[styles.cell, { width: 90 }]}>
                        <Text style={styles.headerText}>OT Hour</Text>
                    </View>

                    <View style={[styles.cell, { width: 90 }]}>
                        <Text style={styles.headerText}>OT Amount</Text>
                    </View>



                
                </View>

              

                <ScrollView
      style={{ height: '70%' }}  
    >
                {OverTimedata?.data ? (
                    OverTimedata?.data.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.row,
                                index % 2 === 0 ? styles.evenRow : styles.oddRow
                            ]}
                        >
                            <View style={[styles.cell, { width: 30 }]}>
                                <Text style={styles.cellText}>{index + 1}</Text>
                            </View>
                            <View style={[styles.cell, { width: 100 }]}>
                                <Text style={styles.cellText}>{item.DOCDATE}</Text>
                            </View>

                            <View style={[styles.cell, { width: 90 }]}>
                                <Text style={[styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{item.OT}</Text>
                            </View>

                            <View style={[styles.cell, { width: 90 }]}>
                                <Text style={[styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{Number(item?.OTAMT).toFixed(2)}</Text>
                            </View>


                        </View>
                    ))
                ) : (
                    <Text>No data available</Text>
                )}


</ScrollView>

            </View>
               


            </ScrollView>


            
<ScrollView horizontal>
            <View style={styles.tableContainer}>
            <View style={[styles.row, styles.headerRow]}>
                   
                    <View style={[styles.cell, { width: 100 }]}>
                        <Text style={styles.headerText}>Total Days</Text>
                    </View>

                    <View style={[styles.cell, { width: 90 }]}>
                        <Text style={styles.headerText}>Total Hour</Text>
                    </View>

                    <View style={[styles.cell, { width: 120 }]}>
                        <Text style={styles.headerText}>Total Amount</Text>
                    </View>



                
                </View> 

                <View style={styles.tableContainer}>
                <View
                           
                            style={[
                                styles.row,
                            ]}
                        >
                            
                            <View style={[styles.cell, { width: 100 }]}>
                                <Text style={[styles.cellText,{alignSelf:"flex-end",paddingRight:5}]}>{OverTimedata?.data?.length || 0 }</Text>
                            </View>

                            <View style={[styles.cell, { width: 90 }]}>
                                <Text style={[styles.cellText,{alignSelf:"flex-end",paddingRight:5}]}>{OtData?.OT || 0 } Hr</Text>
                            </View>

                            <View style={[styles.cell, { width: 120 }]}>
                                <Text style={[styles.cellText,{alignSelf:"flex-end",paddingRight:5}]}>{ NumbertoCurrency( OtData?.OTAMT || 0) }</Text>
                            </View>
</View>


 </View>
                </View>


               
 </ScrollView>



</View>




     </View>
  )
}




export default OTIndividualModalBody