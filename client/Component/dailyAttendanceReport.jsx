import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { useSelector } from 'react-redux';
import moment from 'moment';
import NavBar from './Navbar';
import { useGetMisDashboardOrdersInHandMonthWiseQuery } from '../redux/service/misDashboardService';
import { DateInput } from '../ReusableComponents/inputs';

export default function AttendanceReport() {
    const [date, setDate] = useState(new Date());
    const orientation = useDeviceOrientation();
    console.log(date, 'date');

    const { data: data } = useGetMisDashboardOrdersInHandMonthWiseQuery({ params: { date: date } });

    const tableData = data?.data || []

    return (<> <NavBar />
        <View style={styles.pageContainer}>
           
            <View style={styles.topBar}>
                <Text style={styles.header}>Attendance Report</Text>
                <DateInput date={date} setDate={setDate} />
                </View>
            <ScrollView style={styles.verticalScroll} nestedScrollEnabled>
            
                <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                      {/*  <View style={[styles.row, styles.headerRow]}>
                            <View style={[styles.cell, { width: 30 }]}>
                                <Text style={styles.headerText}>Sno</Text>
                            </View>
                            <View style={[styles.cell, { width: 100 }]}>
                                <Text style={styles.headerText}>Category</Text>
                            </View>
                            <View style={[styles.cell, { width: 100 }]}>
                                <Text style={styles.headerText}>Department</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}> Total</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}> Male</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}> Female</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Abs Male</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Abs Female</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Abs Total</Text>
                            </View>

                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Pre Female</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Pre Male</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Pre Total</Text>
                            </View>
                        </View>}

                        {/* Table Data */}
                        {/*
                        tableData && tableData.length > 0 ? (
                            tableData.map((item, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.row,
                                        index % 2 === 0 ? styles.evenRow : styles.oddRow,
                                    ]}
                                >
                                    <View style={[styles.cell, { width: 30 }]}>
                                        <Text style={styles.cellText}>{index + 1}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 100 }]}>
                                        <Text style={styles.cellText}>{item.BANDID}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 100 }]}>
                                        <Text style={styles.cellText}>{item.DEPTNAME}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.GENDERTOT}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.TOTALMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.TOTALFEMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.ABSMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.ABSFEMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.ABTOT}</Text>
                                    </View>

                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.PREFEMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.PREMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.PRETOT}</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noDataText}>No data available</Text>
                        )
                        */
                        }

                     
                           <View style={[styles.row, styles.headerRow]}>
                            <View style={[styles.cell, { width: 30 }]}>
                                <Text style={styles.headerText}>Sno</Text>
                            </View>
                            <View style={[styles.cell, { width: 150 }]}>
                                <Text style={styles.headerText}>Category</Text>
                            </View>
                            <View style={[styles.cell, { width: 150 }]}>
                                <Text style={styles.headerText}>Department</Text>
                            </View>
                          
                            <View style={[styles.cell, { width: 200 }]}>
                                <View style={[styles?.row_header,{ width: 200 }]}>
                                <Text style={styles.headerText}>Male</Text>
                                </View>

                                <View style={[styles?.row,{ width: 200 }]}>

                                  <View style={[styles.cell, { width: 66.6 }]}>
                                   <Text style={styles.headerText}>Total</Text>
                                     </View>

                                  <View style={[styles.cell, { width: 66.6 }]}>
                                   <Text style={styles.headerText}>Pre</Text>
                                     </View>


                                     <View style={[styles.cell, { width: 66.6 }]}>
                                   <Text style={styles.headerText}>Abs</Text>
                                     </View>
                                 </View>
                            </View>


                            <View style={[styles.cell, { width: 200 }]}>
                                <View style={[styles?.row_header, { width: 200 }]}>
                                <Text style={styles.headerText}>Female</Text>
                                </View>
                                <View style={[styles?.row,{alignSelf:"stretch",height:"fit"}]}>

                                  <View style={[styles.cell, { width: 66.6 }]}>
                                   <Text style={styles.headerText}>Total</Text>
                                     </View>

                                  <View style={[styles.cell, { width: 66.6 }]}>
                                   <Text style={styles.headerText}>Pre</Text>
                                     </View>


                                     <View style={[styles.cell, { width: 66.6 }]}>
                                   <Text style={styles.headerText}>Abs</Text>
                                     </View>
                                     </View>
                            </View>
                            </View>

                             {/* Table Data */}
                        {
                        tableData && tableData.length > 0 ? (
                            tableData.map((item, index) => (
                                <>
                                <View
                                    key={index}
                                    style={[
                                        styles.row,
                                    ]}
                                  >
                                     <View style={[styles.cell, { width: 30 }]}>
                                        <Text style={styles.cellText}>{index + 1}</Text>
                                    </View>
                                       <View style={[styles.cell, { width: 150 }]}>
                                      <Text style={styles.cellText}>{item.BANDID}</Text>
                                       </View>
                                       <View style={[styles.cell, { width: 150 }]}>
                                        <Text style={styles.cellText}>{item.DEPTNAME}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 66.6 }]}>
                                        <Text style={styles.cellText}>{Number(item?.PREMALE)+Number(item.ABSMALE)}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 66.6 }]}>
                                        <Text style={styles.cellText}>{item.PREMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 66.6 }]}>
                                        <Text style={styles.cellText}>{item.ABSMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 66.6 }]}>
                                        <Text style={styles.cellText}>{Number(item.PREFEMALE)+Number(item?.ABSFEMALE)}</Text>
                                    </View>

                                    <View style={[styles.cell, { width: 66.6 }]}>
                                        <Text style={styles.cellText}>{item.PREFEMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 66.6 }]}>
                                        <Text style={styles.cellText}>{item?.ABSFEMALE}</Text>
                                    </View>
                                    
                                </View>

                             

                             
                                
                                </>
                            ))
                        ) : (
                            <Text style={styles.noDataText}>No data available</Text>
                        )
                        
                        }
                           
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 5,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
    },
    verticalScroll: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 10,
    },
    tableContainer: {
        flex: 1,
        width:"100%",
        borderWidth: 1,
        borderColor: '#ddd',
        
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,

        borderColor: '#ddd',
    },row_header:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        justifyContent:"center"
    },
    evenRow: {
        backgroundColor: '#f9f9f9',
    },
    oddRow: {
        backgroundColor: '#ECECEC',
    },
    headerRow: {
        backgroundColor: '#f1f8ff',
        borderTopWidth: 1,
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 6,
        textAlign:"center",
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: "justify",
        fontSize: 14,
        alignItems:"center",

    },
    cellText: {
        textAlign: 'center',
        fontSize: 12,
    },
    cellNumber: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    dueDaysWarning: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
    },
    cellNum: {
        textAlign: 'center',
        fontSize: 12,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 14,
        padding: 10,
    },
});
