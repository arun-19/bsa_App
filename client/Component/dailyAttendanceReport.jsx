import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { useSelector } from 'react-redux';
import moment from 'moment';
import NavBar from './Navbar';
import { useGetMisDashboardOrdersInHandMonthWiseQuery } from '../redux/service/misDashboardService';

export default function AttendanceReport() {
    const orientation = useDeviceOrientation();
    const { data: data } = useGetMisDashboardOrdersInHandMonthWiseQuery({ params: {} });
    console.log(data, 'data');

    const tableData = data?.data || []

    const getDueDaysStyle = (due) => {
        return due < 30 ? styles.dueDaysWarning : styles.cellNum;
    };

    return (
        <View style={styles.pageContainer}>
            <NavBar />
            <Text style={styles.header}>Attendance Report</Text>

            <ScrollView style={styles.verticalScroll} nestedScrollEnabled>
                {/* Horizontal Scrolling */}
                <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={[styles.row, styles.headerRow]}>
                            <View style={[styles.cell, { width: 30 }]}>
                                <Text style={styles.headerText}>Sno</Text>
                            </View>
                            <View style={[styles.cell, { width: 100 }]}>
                                <Text style={styles.headerText}>Band ID</Text>
                            </View>
                            <View style={[styles.cell, { width: 100 }]}>
                                <Text style={styles.headerText}>Department</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Abs Female</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Abs Male</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Abs Total</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Ap Female</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Ap Male</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Ap Total</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Gender Total</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Pref Female</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Pref Male</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={styles.headerText}>Pref Total</Text>
                            </View>
                        </View>

                        {/* Table Data */}
                        {tableData && tableData.length > 0 ? (
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
                                        <Text style={styles.cellText}>{item.ABSFEMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.ABSMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.ABTOT}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.APFEMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.APMALE}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.APTOT}</Text>
                                    </View>
                                    <View style={[styles.cell, { width: 80 }]}>
                                        <Text style={styles.cellText}>{item.GENDERTOT}</Text>
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
                        )}
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
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
        borderWidth: 1,
        borderColor: '#ddd',
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
        backgroundColor: '#f1f8ff',
        borderTopWidth: 1,
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 6,
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
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
