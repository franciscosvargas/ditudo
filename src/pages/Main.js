/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { SafeAreaView, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Location from '../services/location'

export default function Main({ navigation }) {

    useEffect(() => {
    })


    return (
        <SafeAreaView >
            <Location></Location>

        </SafeAreaView>
    )
}

