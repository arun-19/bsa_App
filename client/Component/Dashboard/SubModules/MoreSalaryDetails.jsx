import { ScrollView, Text, View } from "react-native"
import Table_styles from "../../Style/TableStyle"
import { NumbertoCurrency } from "../../Utils/NumberToCurrency"
import CustomText from "../../Text/CustomText"


function MoreSalaryDetails({data}) {

  return (<>

  <CustomText style={{marginTop:10, textDecorationLine: 'underline'}}>NET Salary - {NumbertoCurrency(data?.salary)}</CustomText>
 
    <View style={{display:"flex",flexDirection:"row",marginLeft:10}}>
                  <View style={{flexDirection:"column"}}>
                  <Text >PAYPERIOD</Text>
                  <Text >BASIC SALARY</Text>
                  <Text >SALARY TYPE</Text>
                  <Text >Working Days</Text>
                  <Text >OT Hour</Text>
                  <Text >OT Amount</Text>
                  </View>
 
                  <View style={{flexDirection:"column"}}>
                  <Text style={[{alignSelf:"baseline"}]}> : {data?.payperiod}</Text>
                  <Text style={[{alignSelf:"baseline"}]}> : {data?.basic}</Text>
                  <Text style={[{alignSelf:"baseline"}]}> : {data?.saltype}</Text>
                  <Text style={[{alignSelf:"baseline"}]}> : {data?.wd} Days</Text>
                  <Text style={[{alignSelf:"baseline"}]}> : {data?.ot}Hr</Text>
                  <Text style={[{alignSelf:"baseline"}]}> : {data?.otamt}</Text>
                
                </View>
             </View>
          
 
  {/* <ScrollView horizontal  >
    <View style={[Table_styles.tableContainer,{marginTop:10}]}>
    <View style={[Table_styles.row, Table_styles.headerRow]}>
                        <View style={[Table_styles.cell, { width: "10%" }]}>
                            <Text style={Table_styles.headerText}>S.no</Text>
                        </View>
                        <View style={[Table_styles.cell, { width: "15%" }]}>
                            <Text style={Table_styles.headerText}>PAYPERIOD</Text>
                        </View>

                        <View style={[Table_styles.cell, { width: "15%" }]}>
                            <Text style={Table_styles.headerText}>BASIC SALARY</Text>
                        </View>

                        <View style={[Table_styles.cell,{ width: "15%" }]}>
                            <Text style={Table_styles.headerText}>SALARY TYPE</Text>
                        </View>

                        <View style={[Table_styles.cell, { width: "15%" }]}>
                            <Text style={Table_styles.headerText}>Working Days</Text>
                        </View>
    
    
                        <View style={[Table_styles.cell, { width: "15%" }]}>
                            <Text style={Table_styles.headerText}>OT Hour</Text>
                        </View>
    
                        <View style={[Table_styles.cell, { width: "15%" }]}>
                            <Text style={Table_styles.headerText}>OT Amount</Text>
                        </View>
    
    
    
                    
                    </View>
                    <View style={Table_styles.tableContainer}>

                         <View
                                                   
                                                    style={[
                                                        Table_styles.row,
                                                        Table_styles.evenRow 
                                                    ]}
                                                >

                        <View style={[Table_styles.cell, { width: "10%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>1</Text>
                             </View>

                             <View style={[Table_styles.cell, { width: "15%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"center",paddingRight:4}]}>{data?.payperiod}</Text>
                             </View>

                             <View style={[Table_styles.cell, { width: "15%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"center",paddingRight:4}]}>{data?.basic}</Text>
                             </View>

                             <View style={[Table_styles.cell, { width: "15%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"center",paddingRight:4}]}>{data?.saltype}</Text>
                             </View>

                             <View style={[Table_styles.cell, { width: "15%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{data?.wd} Days</Text>
                             </View>


                             <View style={[Table_styles.cell, { width: "15%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{data?.ot}Hr</Text>
                             </View>

                             <View style={[Table_styles.cell, { width: "15%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{data?.otamt}</Text>
                             </View>

                             </View>
                  </View>
                    </View>
 
                </ScrollView> */}
                <Text style={[{paddingRight:4,color:"red",fontSize:16,alignSelf:"flex-start", textDecorationLine: 'underline',marginBottom:0}]}>Deductions Details </Text>
               
               
                <ScrollView horizontal >

                <View style={[Table_styles.tableContainer,{marginTop:10}]}>
    <View style={[Table_styles.row, Table_styles.headerRow]}>
                        <View style={[Table_styles.cell, { width: "8%" }]}>
                            <Text style={Table_styles.headerText}>S.no</Text>
                        </View>
                        <View style={[Table_styles.cell, { width: "23%" }]}>
                            <Text style={Table_styles.headerText}>ADV</Text>
                        </View>

                        <View style={[Table_styles.cell, { width: "23%" }]}>
                            <Text style={Table_styles.headerText}>LOAN</Text>
                        </View>

                        <View style={[Table_styles.cell,{ width: "23%" }]}>
                            <Text style={Table_styles.headerText}>PER  Wages</Text>
                        </View>
                        <View style={[Table_styles.cell,{ width: "23%" }]}>
                            <Text style={Table_styles.headerText}>Final Deduction </Text>
                        </View>

                    
                    </View>
                    <View style={Table_styles.tableContainer}>

                         <View
                                                   
                                                    style={[
                                                        Table_styles.row,
                                                        Table_styles.evenRow 
                                                    ]}
                                                >

                        <View style={[Table_styles.cell, { width: "8%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>1</Text>
                             </View>

                             <View style={[Table_styles.cell, { width: "23%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{NumbertoCurrency(data?.adv)}</Text>
                             </View>

                             <View style={[Table_styles.cell, { width: "23%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{NumbertoCurrency(data?.loan)}</Text>
                             </View>

                             <View style={[Table_styles.cell, { width: "23%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{NumbertoCurrency(data?.pwage)}</Text>
                             </View>

                             <View style={[Table_styles.cell, { width: "23%" }]}>
                            <Text style={[Table_styles.cellText,{alignSelf:"flex-end",paddingRight:4}]}>{NumbertoCurrency(data?.deb)}</Text>
                             </View>


                             </View>
                  </View>
                    </View>
                    </ScrollView>
 
                           
                </>
  )
}

export default MoreSalaryDetails