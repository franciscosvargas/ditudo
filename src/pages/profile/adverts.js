/* eslint-disable prettier/prettier */
import React, { Component, } from 'react'
import { SafeAreaView, TouchableOpacity, StyleSheet, Image, Text, FlatList, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'

import api from '../../services/api'
import add from '../../assets/plus.png'
export default class Adverts extends Component {
	state = {
		data: [],
		have: true
	}

	componentDidMount() {
		/* this.getProductData() */
	}

	async getProductData() {
		let have = true
		const response = await api.get('/product/getByOwner')
		if (response.data.length == 0) have = false
		this.setState({ data: response.data.slice(0).reverse(), have })
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<NavigationEvents onWillFocus={() => this.getProductData()} />
				{this.state.have && (
					<FlatList
						style={{ flex: 1 }}
						data={this.state.data}
						extraData={this.state}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => { this.props.navigation.navigate('Ad', { data: item }) }}
								style={styles.item}
							>
								<Image style={styles.itemImage} source={{ uri: item.image }} />
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

				{!this.state.have && <Text style={styles.errorMessage}>Você ainda não possui anúncios</Text>}

			</SafeAreaView>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		alignItems: 'center',
		justifyContent: 'center'
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
		fontSize: 20,
		color: '#999'
	}
})

Adverts.navigationOptions = ({ navigation }) => ({
	title: 'Meus anúncios',
	headerTitleStyle: {
		textAlign: 'left',
		fontFamily: 'Raleway',
		fontSize: 20,
	},
	headerRightContainerStyle: {
		paddingRight: 20
	},
	headerRight: (
		<TouchableOpacity onPress={() => { navigation.navigate('addAdvert') }}>
			<Image style={{ width: 22, height: 22 }} source={add} />
		</TouchableOpacity>
	)
})
