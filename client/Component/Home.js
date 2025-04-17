import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCard from './CustomCard';
import { useCustomFonts } from './CustomHooks/useFonts';
import CustomText from './Text/CustomText';
import { useSelector } from 'react-redux';

export default function Home({ navigation }) {
    const [username, setUsername] = useState(null);
    const ConstomFont=useCustomFonts()
    // State to control modals for each card
    const [vehicleOpen, setVehicleOpen] = useState(true);
    const [payrollOpen, setPayrollOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem('userName');
            let userName=JSON.parse(storedUser)
            setUsername(userName?.userName); // Set the username in state
        };
        fetchUser();
    }, []);

    const toggleModal = (cardType) => {
        // Ensure only the specific card modal is toggled
        if (cardType === 'vehicle') {
            setVehicleOpen(!vehicleOpen);
        } else if (cardType === 'payroll') {
            setPayrollOpen(!payrollOpen);
        } else if (cardType === 'report') {
            setReportOpen(!reportOpen);
        }
    };

    return (
        <>
        <View style={styles.mainContainer}>
     
            {/* User Greeting */}
            <View style={styles.labelContainer}>
                <CustomText style={styles.label}>Welcome: <Text style={styles.user}>{username}</Text></CustomText>
            </View>

            {/* Card Sections */}
            <View style={styles.cardList}>
                {/* Vehicle Card */}
                <CustomCard
                    title="Vehicle"
                    onPress={() => toggleModal('vehicle')}
                    openModel={vehicleOpen}
                    closeModel={() => setVehicleOpen(false)}
                    navigation={navigation}
                />

                {/* Payroll Card */}
                {/* <CustomCard
                    title="Payroll"
                    onPress={() => toggleModal('payroll')}
                    openModel={payrollOpen}
                    closeModel={() => setPayrollOpen(false)}
                    navigation={navigation}
                /> */}

                {/* Report Card */}
                {/* <CustomCard
                    title="Report"
                    onPress={() => toggleModal('report')}
                    openModel={reportOpen}
                    closeModel={() => setReportOpen(false)}
                /> */}
            </View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,

    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 15,
        gap: 10,
    },
    label: {
        fontSize: 23,
        fontFamily:"Dosis-Bold",
        color: '#1b1c1c',
        fontWeight:"ultralight"
    },
    user: {
        fontSize: 26,
        color: '#21618c',
    },
    cardList: {
        marginTop: 5, // Add margin to the card list as a whole for spacing
    },
});
