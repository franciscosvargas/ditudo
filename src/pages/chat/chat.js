import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, TouchableOpacity, YellowBox, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage'

YellowBox.ignoreWarnings([
	'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

export default class Chat extends Component {

	state = {
		message: '',
		messages: []
	}

	constructor(props) {
		super(props);

		this.socket = io('http://localhost:3001', {
			forceNew: true,
			query: {
				chat: this.props.navigation.state.params.chat._id,
				owner: this.props.navigation.state.params.chat.owner,
				buyer: this.props.navigation.state.params.chat.buyer,
				iam: this.props.navigation.state.params.chat.iam
			}
		})

		this.socket.on('oldMessages', messages => {
			this.setState({ messages })
		})

		this.socket.on('receiveMessage', message => {
			let messages = this.state.messages
			messages.push(message)
			this.setState({ messages })
		})

	}

	componentDidMount() {
	}

	sendNewMessage = () => {
		const newMessage = {
			chat: this.props.navigation.state.params.chat._id,
			owner: this.props.navigation.state.params.chat.owner,
			author: this.props.navigation.state.params.chat.iam,
			message: this.state.message
		}
		this.socket.emit('newMessage', { newMessage })
		this.setState({
			message: null
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList

					style={styles.messageList}
					data={this.state.messages}
					extraData={this.state}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => {
						if (item.author != this.props.navigation.state.params.chat.iam) {
							item.author = false
						}
						return (
							<View>
								{item.author && (
									<View style={styles.badgeContainerSend}>
										<View style={styles.badgeSend}>
											<Text style={{ color: '#fff' }}>{item.message}</Text>
										</View>
									</View>
								)}
								{!item.author && (
									<View>
										<View style={styles.badgeReceived}>
											<Text style={{ color: '#000' }}>{item.message}</Text>
										</View>
									</View>
								)}
							</View>

						)
					}}
				/>
				<View style={styles.writeMessageContainer}>
					<TextInput
						style={styles.inputMessage}
						placeholderTextColor='#fff'
						placeholder='Insira a mensagem aqui...'
						value={this.state.message}
						onChangeText={(text) => { this.setState({ message: text }) }}
					/>
					<TouchableOpacity
						onPress={this.sendNewMessage}
					>
						<Icon name="send" size={26} color='#fff' />

					</TouchableOpacity>

				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	messageList: {
		flex: 1
	},
	writeMessageContainer: {
		backgroundColor: '#0E65E5',
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputMessage: {
		width: '90%',
		color: '#fff',
		fontFamily: 'Cabin'
	},
	badgeContainerSend: {
		alignItems: 'flex-end',
		justifyContent: 'flex-start'
	},
	badgeSend: {
		maxWidth: 300,
		flex: -1,
		marginLeft: 30,
		marginTop: 10,
		marginRight: 10,
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#0E65E5'
	},
	badgeReceived: {
		maxWidth: 300,
		marginLeft: 10,
		marginTop: 10,
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#dbdbdb'
	}

})

Chat.navigationOptions = ({ navigation }) => ({

	title: navigation.state.params.chat.product.name,
	headerTitleStyle: {
		textAlign: 'left',
		fontFamily: 'Raleway',
		fontSize: 20,
	},
	headerRightContainerStyle: {
		paddingRight: 20
	},
	headerRight: (
		<TouchableOpacity onPress={() => {
			navigation.navigate('Ad', {data: navigation.state.params.chat.product})
		}}>
			<Icon name="info" size={26} color='#000' />
		</TouchableOpacity>

	)

})
