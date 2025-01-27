import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, Image } from 'react-native';


import NavBar from './Navbar';

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
    const [openModel, setOpenModel] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedAction, setSelectedAction] = useState('');


    function openPage(selectedAction) {
        console.log(selectedAction, 'selectedAction');
        navigation.navigate(`${selectedAction}`)

    }

    const handleClick = (label, action) => {
        setSelectedCard(label);
        setSelectedAction(action);
        setOpenModel(true);
        openPage(action)
    };


    const cardLabels = [
        { label: 'Insurance Details', action: 'INSURANCEREPORT', image: require('./img/insurance.png') },
        { label: 'Apply Leave ', action: 'leave', image: require('./img/exit.png') },
        { label: 'Attendance Register', action: 'punch', image: require('./img/attendance.png') },
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


                <Text style={styles.header}>Welcome </Text>



                <View style={styles.cardContainer}>
                    {cardLabels.map((item, index) => (
                        <View>
                            <TouchableOpacity
                                key={index}
                                style={styles.card}
                                onPress={() => handleClick(item.label, item.action)}
                            >
                                <Image
                                    style={styles.title}
                                    source={item.image}
                                />
                                {/* Ensure Text components are wrapped properly */}
                                <Text style={styles.cardText}>{item.label}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View></View>
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
        width: 80,
        height: 80,
    },
});
