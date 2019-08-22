import React from 'react'
import { Image } from 'react-native'
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

// Primary Routes
import Initial from './pages/InitialVerification'
import Login from './pages/Login'
import Register from './pages/Register'
import Main from './pages/Main'
import Profile from './pages/Profile'
import Conversations from './pages/chat/conversations'
import Conversation from './pages/chat/chat'
import Map from './pages/search/Map'

// Profile Navigation 
import Adverts from './pages/profile/adverts'
import addAdvert from './pages/profile/addAdvert'

import Ad from './pages/search/Ad'

const Pesquisar = createStackNavigator({
	Main,
	Ad,
	Map,
},{initialRouteName: 'Main'})

const Chat = createStackNavigator({
	Conversations,
	Conversation,
	Ad
},{initialRouteName: 'Conversations'})

const Perfil = createStackNavigator({
	Profile,
	Adverts,
	Map,
	Ad,
	addAdvert,	
},{initialRouteName: 'Profile'})

const Auth = createSwitchNavigator({
	Initial,
	Login,
	Register
},{initialRouteName: 'Initial'})

const App = createBottomTabNavigator({
	Pesquisar,
	Chat,
	Perfil
}, {
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				if (routeName === 'Pesquisar') {
					return (
						<Icon name="search" size={24} color={tintColor}/>

					);
				} else if (routeName === 'Chat') {
					return (
						<Icon name="comment" size={25} color={tintColor}/>
					);
				} else if (routeName === 'Perfil') {
					return (
						<Icon name="user" size={24} color={tintColor}/>
					);
				}
			},
		}),
		tabBarOptions: {
			
			keyboardHidesTabBar: true,
			activeTintColor: '#0E65E5',
			inactiveTintColor: '#323232',
			style: {
				height: 60,
				padding: 5
			},
			labelStyle: {
				fontSize: 13,
				fontFamily: 'Cabin'
			}
		},
	})

export default createAppContainer(createSwitchNavigator({
	Auth,
	App
}))