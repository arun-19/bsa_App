import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, Image } from 'react-native';
import Punch from './Punch';
import ApplyLeave from './ApplyLeave';
import LeaveEntryPage from './ApplyLeave';

const { width, height } = Dimensions.get('window');

export default function Approval({ navigation }) {
    const [openModel, setOpenModel] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);  // Track selected card
    const [selectedAction, setSelectedAction] = useState(''); // Track action (punch or leave)

    // Example data
    const summaryData = {
        inTime: "09:00 AM",
        outTime: "05:00 PM",
        advance: "₹5000",
        due: "₹2000",
        pending: "₹1000",
        totalPresentDays: 20,
        totalLeave: 5,
    };

    const handleClick = (label, action) => {
        setSelectedCard(label);
        setSelectedAction(action);
        setOpenModel(true);
    };

    const closeModel = () => {
        setOpenModel(false);
    };

    // Cards: Some labeled "Attendance" and some "Apply Leave"
    const cardLabels = [
        { label: 'Attendance 1', action: 'punch', image: require('./img/img1.png') },
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
        <View style={styles.container}>
            {/* Modal component */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={openModel}
                onRequestClose={closeModel}
            >
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        {selectedAction === 'punch' && <Punch closeModel={closeModel} />}
                        {selectedAction === 'leave' && <LeaveEntryPage closeModel={closeModel} />}
                    </View>
                </View>
            </Modal>

            <Text style={styles.header}>Welcome Manoj</Text>


            <View style={styles.summaryContainer}>
                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>In Time:</Text>
                        <Text style={styles.summaryValue}>{summaryData.inTime}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Out Time:  </Text>
                        <Text style={styles.summaryValue}>{summaryData.outTime}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Advance:</Text>
                        <Text style={styles.summaryValue}>{summaryData.advance}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Due:</Text>
                        <Text style={styles.summaryValue}>{summaryData.due}</Text>
                    </View>
                </View>
                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Pending:</Text>
                        <Text style={styles.summaryValue}>{summaryData.pending}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}> Present Days:   </Text>
                        <Text style={styles.summaryValue}>{summaryData.totalPresentDays}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total Leave: </Text>
                        <Text style={styles.summaryValue}>{summaryData.totalLeave}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.cardContainer}>
                {cardLabels.map((item, index) => (
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
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
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
        height: 150,
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
