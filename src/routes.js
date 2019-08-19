import React from 'react'
import { Image } from 'react-native'
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'

import Initial from './pages/InitialVerification'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Main'
import Pesquisar from './pages/Main'
import Pedidos from './pages/Invoices'
import Profile from './pages/Profile'

const Perfil = createSwitchNavigator({
    Profile,
})

const Auth = createSwitchNavigator({
    Initial,
    Login,
    Register
})

const App = createBottomTabNavigator({
    Pesquisar,
    Pedidos,
    Perfil
}, {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'Home') {
                    return (
                        <Image
                            source={require('./assets/home.png')}
                            style={{ width: 25, height: 25, }} />
                    );
                } else if(routeName === 'Pesquisar'){
                    return (
                        <Image
                            source={require('./assets/magnifier.png')}
                            style={{ width: 25, height: 25 }} />
                    );
                } else if (routeName === 'Pedidos') {
                    return (
                        <Image
                            source={require('./assets/invoice.png')}
                            style={{ width: 25, height: 25 }} />
                    );
                } else if (routeName === 'Perfil') {
                    return (
                        <Image
                            source={require('./assets/user.png')}
                            style={{ width: 25, height: 25 }} />
                    );
                }
            },
        }),
        tabBarOptions: {
            
            activeTintColor: '#0E65E5',
            inactiveTintColor: '#000',
            style: {
                height: 60,
                padding:5
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