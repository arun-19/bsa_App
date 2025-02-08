import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-ui-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

export const Dropdown = ({ selected, setSelected, options, label }) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(
        (options?.data || []).map((item) => ({
            label: item?.value,
            value: item?.id,
        }))
    );

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <DropDownPicker
                open={open}
                value={selected}
                items={items}
                setOpen={setOpen}
                setValue={setSelected}
                setItems={setItems}
                searchable={true}
                searchPlaceholder="Search options..."
                placeholder="Select user Id"
                dropDownDirection="AUTO"
                style={styles.dropdown}
                searchablePlaceholder="Search..."
                searchTextInputStyle={styles.searchTextInputStyle}
                dropDownContainerStyle={styles.dropDownContainerStyle}

            />
        </View>
    );
};

export const DateInput = ({ date, setDate }) => {

    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View
            style={styles.container}
        >
            <Text>Select Date : </Text>
            <TouchableOpacity
                style={styles.dateInputContainer}
                onPress={showDatepicker}>  <Text>{moment(date).format('DD/MM/YYYY')}</Text>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={false}
                        display="default"
                        onChange={onChange}
                        dateFormat='
                        '
                    />
                )}</TouchableOpacity>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: 150,
        paddingRight: 2,
        flexDirection: 'row'
    },
    dateInputContainer: {
        width: 75,
        height: 20,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 4,
        marginBottom: 5,
        borderRadius: 5

    },
    label: {
        fontSize: 16,
        fontWeight: 'semibold',
        marginVertical: 10,
    },
    dropdown: {
        backgroundColor: '#fafafa',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        width: '100%', // Makes dropdown width 100% of the container's width
        minHeight: 40,
        marginBottom: 12,
    },

    dropDownContainerStyle: {
        backgroundColor: '#fff',
        width: '100%', // Ensure the dropdown container has the same width as the dropdown
    },
    searchTextInputStyle: {
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
    },
});
