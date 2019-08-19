/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default function Profile({ navigation }) {

    async function signOut() {
        await AsyncStorage.multiSet([
            ['@Ditudo:token', ''],
            ['@Ditudo:user', '']
        ])

        navigation.navigate('Initial')
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={styles.boxOption}>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.textOption}>Editar meu perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.textOption}>Meus anúncios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.textOption}>Minhas reservas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={signOut} style={styles.optionEspecial}>
                    <Text style={styles.textOption2}>Sair da conta</Text>
                </TouchableOpacity>
            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '93%',
        backgroundColor: 'rgba(230, 230, 230, 0.4)',
        height: 120,
        margin: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    username: {
        marginLeft: 15,
        fontSize: 19,
        fontFamily: 'Cabin',
        fontWeight: 'bold',
        color: '#323232'
    },
    boxOption: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    option: {
        backgroundColor: 'rgba(230, 230, 230, 0.4)',
        height: 100,
        width: '45%',
        margin: 5,
        justifyContent: 'center',
        borderRadius: 10
    },
    optionEspecial: {
        backgroundColor: 'rgba(255, 57, 57, 0.1)',
        height: 100,
        width: '45%',
        margin: 5,
        justifyContent: 'center',
        borderRadius: 10
    },
    imageOption: {
        width: 80,
        height: 80
    },
    textOption: {
        fontFamily: 'Raleway',
        color: '#0E65E5',
        fontSize: 23,
        marginLeft: 10
    },
    textOption2: {
        fontFamily: 'Raleway',
        color: '#FF3939',
        fontSize: 23,
        marginLeft: 10
    }

})
