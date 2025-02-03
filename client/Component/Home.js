import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, Image } from 'react-native';


import NavBar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMisDashboardOrdersInHandQuery } from '../redux/service/misDashboardService';
import { setCountUnder20DueDays } from '../redux/Slices/dueDaysSlice';
import { setTableData } from '../redux/Slices/insuranceDataSlice';
const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
    const [openModel, setOpenModel] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedAction, setSelectedAction] = useState('');
    const { data: insurancedata, error, isLoading, refetch } = useGetMisDashboardOrdersInHandQuery({ params: {} });
    const countUnder20DueDays = useSelector(state => state.dueDays.countUnder20DueDays);

    function openPage(selectedAction) {
        navigation.navigate(`${selectedAction}`)

    }
    console.log(selectedAction, 'selectedAction');

    const handleClick = (label, action) => {
        setSelectedCard(label);
        setSelectedAction(action);
        setOpenModel(true);
        openPage(action)
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (insurancedata?.data) {
            const formattedData = insurancedata.data.map(item => ({
                sno: item.sno,
                discoFinAsset: item.discoFinAsset,
                policyNo: item.policyNo,
                vehNo: item.vehNo,
                vehName: item.vehName,
                totalPremium: item.totalPremium,
                validFrom: item.validFrom,
                validTo: item.validTo,
                insuredby: item.insuredby,
                dueDays: item.dueDays,
            }));
            dispatch(setTableData(formattedData))
            const count = formattedData.filter(item => item.dueDays < 30).length;
            dispatch(setCountUnder20DueDays(count))

        }
    }, [insurancedata]);

    const cardLabels = [
        { label: 'Insurance Details', action: 'INSURANCEREPORT', image: require('./img/insurance.png'), notify: countUnder20DueDays },
        { label: 'Attendance Report ', action: 'ATTENDANCEREPORT', image: require('./img/exit.png') },
        { label: 'Absence Register', action: 'ABSENCEREGISTER', image: require('./img/attendance.png') },
        { label: 'Available Leave ', action: 'punch', image: require('./img/convenience.png') },
        { label: 'Leave register', action: 'punch', image: require('./img/schedule.png') },
        { label: 'On Duty', action: 'punch', image: require('./img/duty.png') },
        { label: 'Duty Register', action: 'punch', image: require('./img/attendance (1).png') },
        { label: 'Advance register', action: 'punch', image: require('./img/payment.png') },
        { label: 'Pay Slip', action: 'punch', image: require('./img/salary-voucher.png') },
    ];

    return (
        <View >
            <NavBar />

            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    {cardLabels.map((item, index) => (
                        <View>
                            <TouchableOpacity
                                key={index}
                                style={styles.card}
                                onPress={() => handleClick(item.label, item.action)}
                            >

                                {item.notify ? <Text style={styles.notify}>{item.notify}</Text> : ''}

                                <Image
                                    style={styles.title}
                                    source={item.image}
                                />
                                {/* Ensure Text components are wrapped properly */}
                                <Text style={styles.cardText}>{item.label}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        marginTop: 10,
    },
    summary: {
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.8,
        height: height * 0.6,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    summaryContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 16,
        fontWeight: '600',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '400',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    card: {
        width: width * 0.28,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
    },
    cardText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    title: {
        width: 40,
        height: 40,
    },
    notify: {
        position: 'absolute',
        top: -5,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 50,
        height: 25,
        width: 25,
        color: 'white',
        textAlign: "center",
        paddingTop: 2,
        fontSize: 18,
    }
});
