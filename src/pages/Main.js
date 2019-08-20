import React, { useEffect, useState } from 'react';
import { ScrollView, View, TextInput, Text, StyleSheet, Image } from 'react-native';

import api from '../services/api'
import location from '../services/location'

export default function Main() {
    const [products, setProducts] = useState({})

    useEffect(() => {
       

    })

    async function getLocation() {
        const {coords} = await location.getLocation()
        return coords
    }
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={{ marginLeft: 10, flexGrow: 1 }}
                    placeholder="Que produto você deseja hoje?"
                    placeholderTextColor="#999"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        margin: 20,
        height: 55,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        elevation: 2
    }

})
