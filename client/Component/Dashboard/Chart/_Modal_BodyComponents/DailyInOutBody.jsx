import { View,Text, ScrollView } from "react-native"
import Table_styles from "../../../Style/TableStyle"
import { useGetInOutQuery } from "../../../../redux/service/misDashboardService"


function DailyInOutBody({UserId,payperiod,COMPCODE}) {



     const {data,error:err}=useGetInOutQuery({params:{
              Idcard:UserId,payperiod,COMPCODE
            }}) 
    
  return (
    <View>
        
    <ScrollView horizontal stickyHeaderIndices={[0]} style={{height:"90%",width:"100%"}}   >
 <View style={Table_styles.tableContainer} >

 <View style={[Table_styles.row, Table_styles.headerRow]}>
                        <View style={[Table_styles.cell, { width: 30 }]}>
                            <Text style={Table_styles.headerText}>Sno</Text>
                        </View>
                        <View style={[Table_styles.cell, { width: 100 }]}>
                            <Text style={Table_styles.headerText}>In Date</Text>
                        </View>
                        <View style={[Table_styles.cell, { width: 100 }]}>
                            <Text style={Table_styles.headerText}>Out Date</Text>
                        </View>
    
                        <View style={[Table_styles.cell, { width: 90 }]}>
                            <Text style={Table_styles.headerText}>In Time</Text>
                        </View>
    
                        <View style={[Table_styles.cell, { width: 90 }]}>
                            <Text style={Table_styles.headerText}>Out Time</Text>
                        </View>

                        <View style={[Table_styles.cell, { width: 90 }]}>
                            <Text style={Table_styles.headerText}>SHIFT CNT</Text>
                        </View>

                        <View style={[Table_styles.cell, { width: 90 }]}>
                            <Text style={Table_styles.headerText}>OT</Text>
                        </View>
    
    
    
                    
                    </View>
<ScrollView
      style={{ height: '100%' }}  
    >
                 
    
                  
                  
                  
    
    
                    { data?.data ? (
                        data.data?.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    Table_styles.row,
                                    index % 2 === 0 ? Table_styles.evenRow : Table_styles.oddRow
                                ]}
                            >
                                <View style={[Table_styles.cell, { width: 30 }]}>
                                    <Text style={Table_styles.cellText}>{index + 1}</Text>
                                </View>
                                <View style={[Table_styles.cell, { width: 100 }]}>
                                    <Text style={Table_styles.cellText}>{item.INDT}</Text>
                                </View>

                                <View style={[Table_styles.cell, { width: 100 }]}>
                                    <Text style={Table_styles.cellText}>{item.OUTDT}</Text>
                                </View>
    
                                <View style={[Table_styles.cell, { width: 90 }]}>
                                    <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{item.INTIME}</Text>
                                </View>
    
                                <View style={[Table_styles.cell, { width: 90 }]}>
                                    <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{item.OUTTIME}</Text>
                                </View>

                                <View style={[Table_styles.cell, { width: 90 }]}>
                                    <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{item.SHIFTCNT}</Text>
                                </View>

                                <View style={[Table_styles.cell, { width: 90 }]}>
                                    <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{item.OT}</Text>
                                </View>
    
    
                            </View>
                        ))
                    ) : (
                        <Text>No data available</Text>
                    )}


    
    
</ScrollView>
    
                
                
                    </View>
    
    
                </ScrollView></View>
  )
}

export default DailyInOutBody