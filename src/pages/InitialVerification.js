/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import logo from '../assets/shopping-bag.png'

export default function Initial({ navigation }) {

    useEffect(() => {
        AsyncStorage.getItem('@Ditudo:token').then(token => {
          if (token) {
            navigation.navigate('Pesquisar', { token })
          } else {
            navigation.navigate('Login')
          }
        });
      }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>
            <Text style={styles.title}>DiTudo</Text>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    title: {
        color: '#0E65E5',
        fontFamily: 'Fredoka One',
        fontSize: 40,
        marginLeft: 10
    },
    subtitle: {
        fontFamily: 'Cabin',
        marginTop: 20,
        color: '#ddd',
        fontSize: 17
    },
    logo: {
        width: 90,
        height: 90,
        marginBottom: 10
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 3,
        paddingHorizontal: 15,
        marginTop: 15
    },
    btnLogin: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#0E65E5',
        borderRadius: 3,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBtnLogin: {
        fontFamily: 'Cabin',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF',
    },
    or: {
        fontFamily: 'Cabin',
        marginTop: 5,
        color: '#ddd',
        fontSize: 17
    },
    btnRegister: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderRadius: 3,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBtnRegister: {
        fontFamily: 'Cabin',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#0E65E5',
    }
})