import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMisDashboardOrdersInHandQuery } from '../redux/service/misDashboardService';
import { setTableData } from '../redux/Slices/insuranceDataSlice';
import { setCountUnder20DueDays } from '../redux/Slices/dueDaysSlice';

const { width, height } = Dimensions.get('window');

const HomeCards = ({ openModel, closeModel, navigation }) => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedAction, setSelectedAction] = useState('');
    const { data: insurancedata } = useGetMisDashboardOrdersInHandQuery({ params: {} });
    const countUnder20DueDays = useSelector(state => state.dueDays.countUnder20DueDays);

    const dispatch = useDispatch();
    function openPage(selectedAction) {
        navigation.navigate(`${selectedAction}`)
    }
    console.log(selectedAction, 'selected');

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
            dispatch(setTableData(formattedData));
            const count = formattedData.filter(item => item.dueDays < 30).length;
            dispatch(setCountUnder20DueDays(count));
        }
    }, [insurancedata]);

    const cardLabels = [
        { label: 'Insurance Details', action: 'INSURANCEREPORT', image: require('./img/insurance.png'), notify: countUnder20DueDays },
        { label: 'Attendance Report', action: 'ATTENDANCEREPORT', image: require('./img/exit.png') },
        { label: 'Absence Register', action: 'ABSENCEREGISTER', image: require('./img/attendance.png') },
        { label: 'Available Leave', action: 'punch', image: require('./img/convenience.png') },
        { label: 'Leave register', action: 'punch', image: require('./img/schedule.png') },
        { label: 'On Duty', action: 'punch', image: require('./img/duty.png') },
        { label: 'Duty Register', action: 'punch', image: require('./img/attendance (1).png') },
        { label: 'Advance register', action: 'punch', image: require('./img/payment.png') },
        { label: 'Pay Slip', action: 'punch', image: require('./img/salary-voucher.png') },
    ];

    const handleClick = (label, action) => {
        setSelectedCard(label);
        setSelectedAction(action);
        openPage(action)
    };

    return (
        <View style={styles.modal}>
            {openModel && (
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={closeModel}>
                        <Text style={styles.closeText}>X</Text>
                    </TouchableOpacity>
                    <View style={styles.container}>
                        {cardLabels.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.card} onPress={() => { handleClick(item.label, item.action) }}>
                                {item.notify && <Text style={styles.notify}>{item.notify}</Text>}
                                <Image style={styles.title} source={item.image} />
                                <Text style={styles.cardText}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        top: 0,
        left: 0,
        width: width,
        height: height,
        padding: 20,
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.8,
        height: height * 0.4,
    },
    closeText: {
        fontSize: 18,
        color: 'red',
        width: "100%",
        flexDirection: 'row',
        alignItems: 'flex-end',
        textAlign: 'left',
        justifyContent: 'flex-end',
        position: "relative",
        right: 0
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: width * 0.18,
        height: 75,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
    },
    cardText: {
        fontSize: 10,
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
        textAlign: 'center',
        paddingTop: 2,
        fontSize: 18,
    },
});

export default HomeCards;
