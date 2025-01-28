import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { useSelector } from 'react-redux';
import moment from 'moment';
import * as ScreenOrientation from 'expo-screen-orientation';
import NavBar from './Navbar';

export default function InsuranceReport() {
    const orientation = useDeviceOrientation();
    const tableData = useSelector(state => state.tableData.tableData);

    // Lock orientation to portrait on mount
    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

        return () => {
            ScreenOrientation.unlockAsync(); // Unlock all orientations on unmount
        };
    }, []);

    const getDueDaysStyle = (due) => {
        let dueDaysStyle = null;
        dueDaysStyle = due < 20 ? styles.dueDaysWarning : styles.cellNum;
        return dueDaysStyle;
    };

    return (
        <View style={styles.pageContainer}>
            <NavBar />
            <Text style={styles.header}>Insurance Detail Report</Text>
            <ScrollView
                horizontal={orientation === "landscape" ? true : false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.tableContainer}>
                    {/* Table Header */}
                    <View style={[styles.row, styles.headerRow]}>
                        <View style={[styles.cell, { width: 30 }]}>
                            <Text style={styles.headerText}>Sno</Text>
                        </View>
                        <View style={[styles.cell, { width: 100 }]}>
                            <Text style={styles.headerText}>Asset</Text>
                        </View>

                        <View style={[styles.cell, { width: 90 }]}>
                            <Text style={styles.headerText}>Vehicle No</Text>
                        </View>
                        <View style={[styles.cell, { width: 100 }]}>
                            <Text style={styles.headerText}>Vehicle Name</Text>
                        </View>
                        <View style={[styles.cell, { width: 60 }]}>
                            <Text style={styles.headerText}>Valid From</Text>
                        </View>
                        <View style={[styles.cell, { width: 60 }]}>
                            <Text style={styles.headerText}>Valid To</Text>
                        </View>
                        <View style={[styles.cell, { width: 130 }]}>
                            <Text style={styles.headerText}>Policy No</Text>
                        </View>
                        <View style={[styles.cell, { width: 230 }]}>
                            <Text style={styles.headerText}>Insured By</Text>
                        </View>
                        <View style={[styles.cell, { width: 60 }]}>
                            <Text style={styles.headerText}>Premium</Text>
                        </View>
                        <View style={[styles.cell, { width: 50 }]}>
                            <Text style={styles.headerText}>Due</Text>
                        </View>
                    </View>

                    {/* Table Data */}
                    {tableData ? (
                        tableData.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.row,
                                    index % 2 === 0 ? styles.evenRow : styles.oddRow
                                ]}
                            >
                                <View style={[styles.cell, { width: 30 }]}>
                                    <Text style={styles.cellText}>{item.sno}</Text>
                                </View>
                                <View style={[styles.cell, { width: 100 }]}>
                                    <Text style={styles.cellText}>{item.discoFinAsset}</Text>
                                </View>

                                <View style={[styles.cell, { width: 90 }]}>
                                    <Text style={styles.cellText}>{item.vehNo}</Text>
                                </View>
                                <View style={[styles.cell, { width: 100 }]}>
                                    <Text style={styles.cellText}>{item.vehName}</Text>
                                </View>
                                <View style={[styles.cell, { width: 60 }]}>
                                    <Text style={styles.cellText}>{moment(item.validFrom).format('DD/MM/YYYY')}</Text>
                                </View>
                                <View style={[styles.cell, { width: 60 }]}>
                                    <Text style={styles.cellText}>{moment(item.validTo).format('DD/MM/YYYY')}</Text>
                                </View>
                                <View style={[styles.cell, { width: 130 }]}>
                                    <Text style={styles.cellText}>{item.policyNo}</Text>
                                </View>
                                <View style={[styles.cell, { width: 230 }]}>
                                    <Text style={styles.cellText}>{item.insuredby}</Text>
                                </View>
                                <View style={[styles.cellNumber, { width: 60 }]}>
                                    <Text style={styles.cellNum}>{item.totalPremium}</Text>
                                </View>
                                <View style={[styles.cellNumber, { width: 50 }]}>
                                    <Text style={getDueDaysStyle(item.dueDays)}>{item.dueDays}</Text>
                                </View>

                            </View>
                        ))
                    ) : (
                        <Text>No data available</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        position: 'relative',
        marginTop: 10,
        margin: 2,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        margin: 5,
    },
    scrollContainer: {
        paddingBottom: 8,
        margin: 5,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    tableContainer: {
        flex: 1,
        paddingBottom: 8,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        width: "100%"
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
        paddingVertical: 4,
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
    },
    cellText: {
        textAlign: 'right',
        fontSize: 12,
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
    }
});
