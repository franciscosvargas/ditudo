import React, { Component } from 'react';
import { ScrollView, View, TextInput, Text, StyleSheet, Image, TouchableOpacity, FlatList, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationEvents } from 'react-navigation'
import * as Progress from 'react-native-progress'

import api from '../services/api'
import location from '../services/location'

export default class Main extends Component {
    state = {
        products: null,
        have: true,
        location: null,
    }

    componentDidMount() {
        
    }
    async fetchProducts(keyword) {
        let have = true
        const {coords} = await  location.getLocation()
        const {latitude, longitude} = coords
        if (!keyword) keyword = ''
            const response = await api.get(`/product/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}`)

        if(response.data.length == 0) {
            response.data = false
            have = false
        }
        this.setState({
            products: response.data,
            load: false,
            have
        })
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
                <NavigationEvents onWillFocus={() => this.fetchProducts('')} />


                <View style={styles.searchBar}>
                    <Icon style={{ marginLeft: 10 }} name="search" size={26} color='#999' />
                    <TextInput
                        style={{ marginLeft: 5, flexGrow: 1, width: '80%' }}
                        placeholder="Que produto você deseja hoje?"
                        placeholderTextColor="#999"
                        onChangeText={(keyword) => this.fetchProducts(keyword)}
                    />
                </View>
                {this.state.products && (
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Map', { data: this.state.products })
                        }}
                        style={styles.mapButton}
                    >
                        <Icon name="room" size={24} color='#fff' />
                        <Text style={styles.mapText}>Ver no mapa</Text>
                    </TouchableOpacity>
                )}

                {this.state.products && (
                    <FlatList
                        style={{ flexGrow: 1 }}
                        data={this.state.products}
                        extraData={this.state}
                        keyExtractor={(item) => { return item._id; }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item._id}
                                onPress={() => { this.props.navigation.navigate('Ad', { data: item }) }}
                                style={styles.item}
                            >
                                <Image style={styles.itemImage} source={{ uri: `data:image/gif;base64,${item.image}` }} />
                                <View style={{ padding: 10, width: '65%' }}>
                                    <Text
                                        style={styles.itemName}
                                        ellipsizeMode={'tail'}
                                        numberOfLines={1}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text style={styles.itemPrice}>R$ {item.price}</Text>
                                    <Text
                                        style={styles.itemDescription}
                                        ellipsizeMode={'tail'}
                                        numberOfLines={3}
                                    >
                                        {item.description}
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        )}
                    />
                )}

                {this.state.load && (<Progress.Circle style={{marginTop: 40}} size={100} indeterminate={true} />)}

                {!this.state.have && <Text style={styles.errorMessage}>Ainda não temos produtos.... </Text>}
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginTop: 10,
        marginHorizontal: 20,
        height: 55,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        elevation: 2,
        alignItems: 'center'
    },
    mapButton: {
        width: '80%',
        backgroundColor: '#0E65E5',
        height: 40,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    mapText: {
        fontSize: 16,
        fontFamily: 'Raleway',
        color: '#fff',
        marginStart: 10
    },
    item: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 4,
        marginHorizontal: 10,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3
    },
    itemName: {
        fontSize: 18,
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
        width: '65%',
        fontSize: 16,
        fontFamily: 'Cabin',
        fontWeight: 'bold',
        color: '#0E65E5',
        marginTop: 5
    },
    itemDescription: {
        textAlign: 'justify',
        fontFamily: 'Cabin',
        color: '#999',
    },
    errorMessage: {
        fontFamily: 'Fredoka One',
        marginTop: '50%',
        fontSize: 20,
        color: '#999'
    }

})

Main.navigationOptions = ({ navigation }) => ({

    title: 'Busca de produtos',
    headerTitleStyle: {
        textAlign: 'left',
        fontFamily: 'Raleway',
        fontSize: 20,
    },
    headerRightContainerStyle: {
        paddingRight: 20
    },

})
