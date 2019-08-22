/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Text, StyleSheet, SafeAreaView, Image, View, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker'
import logo from '../assets/shopping-bag.png'
import api from '../services/api'
import Icon from 'react-native-vector-icons/MaterialIcons'
export default function Register({ navigation }) {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [photo, setPhoto] = useState(null)

    async function signUpUser() {

        if (name != null && email != null && password != null) {
            const body = await createFormData(photo, { name, email, password})
            const response = await api.post('/register', body)

            await AsyncStorage.multiSet([
                ['@Ditudo:token', response.data.token],
                ['@Ditudo:user', JSON.stringify(response.data.user)]
            ])

            navigation.navigate('Initial')
        }

    }

    function handleChoosePhoto() {
        const config = {
            noData: true,
            title: 'Escolha uma foto',
            chooseFromLibraryButtonTitle: 'Escolher da galeria',
            takePhotoButtonTitle: 'Tirar foto',
            cancelButtonTitle: 'Cancelar',

        }

        ImagePicker.showImagePicker(config, response => {
            if (response.uri) {
                setPhoto(response)
            }
        })
    }

    function createFormData(photo, body) {
        const data = new FormData()

        if (photo) {
            data.append("image", {
                name: photo.fileName,
                type: photo.type,
                uri:
                    Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
            })
        }


        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        return data
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
            {photo && (
                <Image
                    source={{ uri: photo.uri }}
                    style={{ width: 150, height: 150, borderRadius: 10, marginTop: 10 }}
                />
            )}
            <TouchableOpacity onPress={handleChoosePhoto} style={styles.btnRegister}>
                <Icon name="photo-camera" size={24} color='#0E65E5' style={{ marginRight: 10 }} />
                <Text style={styles.txtBtnRegister}>Selecionar foto de perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signUpUser} style={styles.btnLogin}>
                <Text style={styles.txtBtnLogin}>Criar uma conta</Text>
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
        flexDirection: 'row',
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