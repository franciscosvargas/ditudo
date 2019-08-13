/* eslint-disable prettier/prettier */
import React, { useState }from 'react'
import { Text, StyleSheet, SafeAreaView, Image, View, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import logo from '../assets/shopping-bag.png'
import api from '../services/api'

export default function Register({ navigation }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')    

    async function signUpUser() {
        const response = await api.post('/register', {name, email, password})

        await AsyncStorage.multiSet([
            ['@Ditudo:token', response.data.token],
            ['@Ditudo:user', JSON.stringify(response.data.user)]
        ])

        navigation.navigate('Initial')  
    }
    function redirectToLogin() {
        navigation.navigate('Login')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo}></Image>
                <Text style={styles.title}>DiTudo</Text>
            </View>
            <Text style={styles.subtitle}>Crie uma conta agora</Text>
            <TextInput
                autoCorrect={false}
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={signUpUser} style={styles.btnLogin}>
                <Text style={styles.txtBtnLogin}>Criar uma conta</Text>
            </TouchableOpacity>

            <Text style={styles.or}>ou</Text>

            <TouchableOpacity
                onPress={redirectToLogin}
                style={styles.btnRegister}
            >
                <Text style={styles.txtBtnRegister}>Voltar</Text>
            </TouchableOpacity>

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
        width: 70,
        height: 70
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