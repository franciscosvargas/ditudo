import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity, Image, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

export default class Ad extends Component {

    state = {
        owner: null,
        products: null,
    }


    getProducts = async () => {
        const id = this.props.navigation.state.params.data._id
        const owner = this.props.navigation.state.params.data.owner._id
		const response = await api.get(`/product/search/others?id=${id}&owner=${owner}`)
        if(response.data && response.data.length > 0) {
			
            this.setState({
                products: response.data
            })
        }    
    }

    createChat = async () => {
        const id = this.props.navigation.state.params.data._id
        const response = await api.post('/chat', { id })
        await AsyncStorage.getItem('@Ditudo:user').then((user) => {
            user = JSON.parse(user)
            response.data.iam = user._id
        })
        this.props.navigation.navigate('Conversation', { chat: response.data })
    }


    componentDidMount() {
        AsyncStorage.getItem('@Ditudo:user').then(user => {
			user = JSON.parse(user)
			
            if (this.props.navigation.state.params.data.owner._id == user._id) {
                this.props.navigation.setParams({
                    iamOwner: user._id
                })
            } else {
                this.props.navigation.setParams({
                    iamOwner: null
				})

				this.getProducts()
			}
			
			
        });

        

    }
    render() {
        return (
            <ScrollView ref='_scrollView' contentContainerStyle={{ paddingBottom: 10 }} style={styles.container}>
            
				<Image
                    style={styles.image}
                    source={{ uri: this.props.navigation.state.params.data.image }}
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

                <View style={{ padding: 10 }}>
                    <Text style={styles.titleProfile}>Informações do vendedor</Text>
                    <View style={{ flexDirection: 'row' }}>

                        {this.props.navigation.state.params.data.owner.image ? (<Image
                            style={styles.profileImage}
                            source={{ uri: this.props.navigation.state.params.data.owner.image }}
                        />) : null}

                        <View style={{ marginLeft: 10, marginTop: 20 }}>
                            <Text style={styles.profileName}>{this.props.navigation.state.params.data.owner.name}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    const data = [this.props.navigation.state.params.data]
                                    this.props.navigation.navigate('Map', { data: data })
                                }}
                                style={styles.button}
                            >
                                <Icon name="room" size={20} color='#0E65E5' />
                                <Text style={styles.textButton}>Ver produto no mapa</Text>
                            </TouchableOpacity>

                            {!this.props.navigation.state.params.iamOwner && (
                                <TouchableOpacity
                                    onPress={this.createChat}
                                    style={styles.button}
                                >
                                    <Icon name="chat" size={20} color='#0E65E5' />
                                    <Text style={styles.textButton}>Conversar com o vendedor</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                </View>
                {this.state.products && (
                    <View>
                        <Text style={styles.titleAds}>Outros anúncios desse vendedor</Text>
                        <FlatList
                            style={{ flex: 1 }}
                            data={this.state.products}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={async () => {
                                        await this.props.navigation.navigate('Ad', { data: item })
                                        await this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true })
                                        this.setState({
                                            products: null
                                        })
                                        this.getProducts()
                                    }}
                                    style={stylesList.item}
                                >
                                    <Image style={stylesList.itemImage} source={{ uri: item.image }} />
                                    <View style={{ padding: 10, width: '65%' }}>
                                        <Text
                                            style={stylesList.itemName}
                                            ellipsizeMode={'tail'}
                                            numberOfLines={1}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text style={stylesList.itemPrice}>R$ {item.price}</Text>
                                        <Text
                                            style={stylesList.itemDescription}
                                            ellipsizeMode={'tail'}
                                            numberOfLines={3}
                                        >
                                            {item.description}
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            )}
                        />

                    </View>
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
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'row',
    },
    textButton: {
        marginLeft: 5,
        color: '#0E65E5',
        fontWeight: 'bold',
        fontFamily: 'Cabin',
        fontSize: 16
    },
    titleProfile: {
        color: '#999',
        fontWeight: 'bold',
        fontFamily: 'Cabin',
        fontSize: 18
    },
    profileImage: {
        marginTop: 10,
        width: 100,
        height: 100,
        borderRadius: 10
    },
    profileName: {
        color: '#000',
        fontWeight: 'bold',
        fontFamily: 'Cabin',
        fontSize: 16
    },
    titleAds: {
        marginTop: 10,
        marginLeft: 10,
        color: '#999',
        fontWeight: 'bold',
        fontFamily: 'Cabin',
        fontSize: 18
    }
})

const stylesList = StyleSheet.create({
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
            {navigation.state.params.iamOwner && (
                <TouchableOpacity onPress={async () => {
                    const response = await api.delete('/product', { data: { id: navigation.state.params.data._id } })
                    return navigation.navigate('Adverts')
                }}>
                    <Icon name="delete" size={25} color='#000' />
                </TouchableOpacity>
            )}
        </View>
    )

})
