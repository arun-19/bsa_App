import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

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

const styles = StyleSheet.create({
    container: {
        width: 170,
        paddingRight: 2

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
