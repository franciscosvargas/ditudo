/* eslint-disable prettier/prettier */
import React from 'react'
import { SafeAreaView, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default function Main({navigation}) {

    async function signOut() {

        await AsyncStorage.multiSet([
            ['@Ditudo:token', ''],
            ['@Ditudo:user', '']
        ])

        navigation.navigate('Initial')

    }

    return (
        <SafeAreaView >
            <TouchableOpacity onPress={signOut}>
                <Text>logout</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}
