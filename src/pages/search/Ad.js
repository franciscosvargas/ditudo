import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

export default class Ad extends Component {

    state = {
        owner: null
    }
    
    createChat = async () => {
        const id = this.props.navigation.state.params.data._id
        const response = await api.post('/chat', {id})
        await AsyncStorage.getItem('@Ditudo:user').then((user) => {
            user = JSON.parse(user)
			response.data.iam = user._id
		})
        this.props.navigation.navigate('Conversation', {chat: response.data})
    }


    componentDidMount() {
        AsyncStorage.getItem('@Ditudo:user').then(user => {
            user = JSON.parse(user)

            if (this.props.navigation.state.params.data.owner == user._id) {
                this.props.navigation.setParams({
                    owner: user._id
                })
            } else {
                this.props.navigation.setParams({
                    owner: null
                })
            }

        });

    }
    render() {
        return (
            <ScrollView contentContainerStyle={{ paddingBottom: 10 }} style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: `data:image/gif;base64,${this.props.navigation.state.params.data.image}` }}
                />
                <View style={{ padding: 10 }}>
                    <Text
                        style={styles.itemName}
                    >
                        {this.props.navigation.state.params.data.name}
                    </Text>
                    <Text style={styles.itemPrice}>R$ {this.props.navigation.state.params.data.price}</Text>
                    <Text
                        style={styles.itemDescription}
                    >
                        {this.props.navigation.state.params.data.description}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        const data = [this.props.navigation.state.params.data]
                        this.props.navigation.navigate('Map', { data: data})
                    }}
                    style={styles.button}
                >
                    <Icon name="room" size={25} color='#FFF' />
                    <Text style={styles.textButton}>Ver no mapa</Text>
                </TouchableOpacity>


                {!this.props.navigation.state.params.owner && (
                    <TouchableOpacity
                        onPress={this.createChat}
                        style={styles.button}
                    >
                        <Icon name="chat" size={25} color='#FFF' />
                        <Text style={styles.textButton}>Conversar com o vendedor</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: 400
    },
    itemName: {
        fontSize: 24,
        fontFamily: 'Cabin',
        fontWeight: 'bold',
        color: '#000',
    },
    itemImage: {
        width: 120,
        height: 120,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    itemPrice: {
        fontSize: 18,
        fontFamily: 'Cabin',
        fontWeight: 'bold',
        color: '#0E65E5',
        marginTop: 5
    },
    itemDescription: {
        fontSize: 16,
        textAlign: 'justify',
        fontFamily: 'Cabin',
        color: '#999',
    },
    button: {
        height: 50,
        width: '90%',
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: '#0E65E5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    textButton: {
        marginLeft: 10,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Cabin',
        fontSize: 18
    }
})

Ad.navigationOptions = ({ navigation }) => ({

    title: navigation.state.params.data.name,
    headerTitleStyle: {
        textAlign: 'left',
        fontFamily: 'Raleway',
        fontSize: 20,
    },
    headerRightContainerStyle: {
        paddingRight: 20
    },
    headerRight: (
        <View>
            {navigation.state.params.owner && (
                <TouchableOpacity onPress={async () => {
                    const response = await api.delete('/product', { data: {id: navigation.state.params.data._id}})
                    return navigation.navigate('Adverts')
                }}>
                    <Icon name="delete" size={25} color='#000' />
                </TouchableOpacity>
            )}
            {!navigation.state.params.owner && (
                <TouchableOpacity>
                    <Icon name="favorite-border" size={25} color='#000' />
                </TouchableOpacity>
            )}
        </View>
    )

})
