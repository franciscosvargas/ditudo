import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationEvents } from 'react-navigation'

import api from '../../services/api'

export default class Chats extends Component {

	state = {
		chats: [],
		have: true
	}

	createChat = async (item) => {
		await AsyncStorage.getItem('@Ditudo:user').then((user) => {
			user = JSON.parse(user)
			item.iam = user._id
		})
		this.props.navigation.navigate('Conversation', { chat: item })
	}


	async getChats() {
		let have = true
		const response = await api.get('/chat')
		if (response.data.length == 0) {
			have = false
			response.data = null
		}
		this.setState({ chats: response.data, have })

	}
	render() {
		return (
			<View style={styles.container}>
				<NavigationEvents onWillFocus={() => this.getChats()} />

				{this.state.have && (
					<FlatList
						contentContainerStyle={{flex: 1}}
						style={{ flex: 1 }}
						data={this.state.chats}
						extraData={this.state}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => this.createChat(item)}
								style={styles.item}
							>
								<View style={{ padding: 10 }}>
									<Text
										style={styles.itemName}
										ellipsizeMode={'tail'}
										numberOfLines={1}
									>
										{item.product.name}
									</Text>
									<Text
										style={styles.itemDescription}
										ellipsizeMode={'tail'}
										numberOfLines={3}
									>
										{item.messages.length > 0 &&
											item.messages[(item.messages.length - 1)].message}
									</Text>
								</View>

							</TouchableOpacity>
						)}
					/>)}

				{!this.state.have && <View style={ { flexGrow:1, alignItems:'center', justifyContent: 'center'}}><Text style={styles.errorMessage}>Você ainda não possui conversas</Text></View>}
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		
	},
	item: {
		flexDirection: 'row',
		marginTop: 4,
		marginBottom: 4,
		marginHorizontal: 10,
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
		fontSize: 20,
		color: '#999',
	}
})
Chats.navigationOptions = ({ navigation }) => ({

	title: 'Conversas ativas',
	headerTitleStyle: {
		textAlign: 'left',
		fontFamily: 'Raleway',
		fontSize: 20,
	},
	headerRightContainerStyle: {
		paddingRight: 20
	}

})
