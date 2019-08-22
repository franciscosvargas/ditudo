import React, { useState, useEffect } from 'react';
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome'
import { NavigationEvents } from 'react-navigation'

import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, TextInput } from 'react-native'

import api from '../../services/api'
import location from '../../services/location'

export default function addAdvert({ navigation }) {
    const [error, setError] = useState(null)
    const [address, setAddress] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState(null)


    async function publishProduct() {
        let latitude = ''
        let longitude = ''

        if (address) {
            const coords = await location.getLocationFromAddress(address)
            console.log(coords)
            latitude = coords.lat
            longitude = coords.lng
        } else {
            const { coords } = await location.getLocation()
            latitude = coords.latitude
            longitude = coords.longitude
        }


        if (photo == null) return setError('Selecione uma imagem')
        if (name == null || price == null) return setError('Preencha nome e preço')

        const body = await createFormData(photo, { name, price, description, latitude, longitude })

        await api.post('/product', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }).then((err) => {
            navigation.navigate('Adverts')
        }).catch((err) => {
            navigation.navigate('Adverts')
        })

    }
    function handleChoosePhoto() {
        ImagePicker.launchImageLibrary({ noData: true }, response => {
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
        <ScrollView style={styles.container} contentContainerStyle={styles.containerDOM}>
            {/* Renderização da imagem do produto */}
            {photo && (
                <Image
                    source={{ uri: photo.uri }}
                    style={{ width: 250, height: 250 }}
                />
            )}

            <TouchableOpacity
                onPress={handleChoosePhoto}
                style={styles.imagePicker}
            >
                <Icon name="camera" size={24} color="#fff" />
                <Text style={styles.textPicker}>Adicionar uma imagem</Text>
            </TouchableOpacity>


            <TextInput
                autoCorrect={false}
                style={styles.input}
                placeholder="Nome do produto"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                autoCorrect={false}
                style={styles.input}
                keyboardType={'numeric'}
                placeholder="Preço do produto"
                placeholderTextColor="#999"
                value={price}
                onChangeText={setPrice}
            />

            <TextInput
                multiline={true}
                autoCorrect={false}
                style={styles.input2}
                placeholder="Descrição do produto"
                placeholderTextColor="#999"
                value={description}
                onChangeText={setDescription}
            />

            <TextInput
                multiline={true}
                autoCorrect={false}
                style={styles.input3}
                placeholder="Digite o endereço de venda ou deixe em branco para usar a localização atual"
                placeholderTextColor="#999"
                value={address}
                onChangeText={setAddress}
            />

            {error && (
                <Text style={{ color: '#FF0000' }}>{error}</Text>
            )}
            <TouchableOpacity
                onPress={publishProduct}
                style={styles.imagePicker}
            >
                <Text style={styles.textPicker}>Publicar Produto</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    containerDOM: {
        flexGrow: 1,
        alignItems: 'center',

    },
    imagePicker: {
        height: 50,
        width: '90%',
        margin: 20,
        backgroundColor: '#0E65E5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    textPicker: {
        marginLeft: 10,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Cabin',
        fontSize: 18
    },
    input: {
        width: '90%',
        height: 50,
        fontSize: 16,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 3,
        paddingHorizontal: 15,
        marginTop: 15
    },
    input3: {
        width: '90%',
        height: 70,
        fontSize: 16,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 3,
        paddingHorizontal: 15,
        marginTop: 15
    },
    input2: {
        width: '90%',
        height: 200,
        fontSize: 16,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 3,
        paddingHorizontal: 15,
        marginTop: 15
    },

})

addAdvert.navigationOptions = {
    title: 'Adicionar um produto',
    headerTitleStyle: {
        textAlign: 'left',
        fontFamily: 'Raleway',
        fontSize: 20,
    }
}