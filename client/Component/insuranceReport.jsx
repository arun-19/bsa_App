import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGetMisDashboardOrdersInHandQuery } from '../redux/service/misDashboardService';
import NavBar from './Navbar';
import { useDeviceOrientation } from '@react-native-community/hooks';

export default function InsuranceReport() {
    const orientation = useDeviceOrientation();
    console.log(orientation);
    const [dueDays, setDueDays] = useState();
    const [countUnder20DueDays, setCountUnder20DueDays] = useState(0); // New state to store the count
    const { data: insurancedata, error, isLoading, refetch } = useGetMisDashboardOrdersInHandQuery({ params: {} });
    const [tableData, setTableData] = useState([]);
    console.log(countUnder20DueDays, 'countUnder20DueDays');

    useEffect(() => {
        if (insurancedata?.data) {
            const formattedData = insurancedata.data.map(item => ({
                sno: item.sno,
                discoFinAsset: item.discoFinAsset,
                policyNo: item.policyNo,
                vehName: item.vehName,
                totalPremium: item.totalPremium,
                dueDays: item.dueDays,
            }));
            setTableData(formattedData);

            // Count entries with dueDays less than 20
            const count = formattedData.filter(item => item.dueDays < 20).length;
            setCountUnder20DueDays(count); // Update the state with the count
        }
    }, [insurancedata]);

    const getDueDaysStyle = (due) => {
        console.log(due, 'due');

        let dueDays = null;
        dueDays = due < 20 ? styles.dueDaysWarning : styles.cellText;

        return dueDays;
    };

    return (
        <View style={styles.pageContainer}>
            <NavBar />
            {/* Display the count of items with dueDays less than 20 */}
            <View style={styles.countContainer}>
                <Text style={styles.countText}>
                    Count of Due Days less than 20: {countUnder20DueDays}
                </Text>
            </View>

            <ScrollView horizontal={orientation === "portrait" ? true : false} contentContainerStyle={styles.scrollContainer}>
                <View style={styles.tableContainer}>
                    {/* Table Header */}
                    <View style={[styles.row, styles.headerRow]}>
                        <View style={[styles.cell, { width: 60 }]}>
                            <Text style={styles.headerText}>Sno</Text>
                        </View>
                        <View style={[styles.cell, { width: 100 }]}>
                            <Text style={styles.headerText}>Asset</Text>
                        </View>
                        <View style={[styles.cell, { width: 150 }]}>
                            <Text style={styles.headerText}>Policy No</Text>
                        </View>
                        <View style={[styles.cell, { width: 120 }]}>
                            <Text style={styles.headerText}>Vehicle Name</Text>
                        </View>
                        <View style={[styles.cell, { width: 100 }]}>
                            <Text style={styles.headerText}>Premium</Text>
                        </View>
                        <View style={[styles.cell, { width: 80 }]}>
                            <Text style={styles.headerText}>Due Days</Text>
                        </View>
                    </View>

                    {tableData.map((item, index) => (
                        <View key={index} style={styles.row}>
                            <View style={[styles.cell, { width: 60 }]}>
                                <Text style={styles.cellText}>{item.sno}</Text>
                            </View>
                            <View style={[styles.cell, { width: 100 }]}>
                                <Text style={styles.cellText}>{item.discoFinAsset}</Text>
                            </View>
                            <View style={[styles.cell, { width: 150 }]}>
                                <Text style={styles.cellText}>{item.policyNo}</Text>
                            </View>
                            <View style={[styles.cell, { width: 120 }]}>
                                <Text style={styles.cellText}>{item.vehName}</Text>
                            </View>
                            <View style={[styles.cell, { width: 100 }]}>
                                <Text style={styles.cellText}>{item.totalPremium}</Text>
                            </View>
                            <View style={[styles.cell, { width: 80 }]}>
                                <Text style={getDueDaysStyle(item.dueDays)}>{item.dueDays}</Text>
                            </View>
                        </View>
                    ))}
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
        margin: 20,
    },
    scrollContainer: {
        paddingBottom: 8,
    },
    tableContainer: {
        flex: 1,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
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
        textAlign: 'center',
        fontSize: 12,
    },
    dueDaysWarning: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
    },
    countContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    countText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
