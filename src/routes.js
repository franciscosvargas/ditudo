import {createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation'

import Initial from './pages/InitialVerification'
import Login from './pages/Login'
import Register from './pages/Register'
import Main from './pages/Main'
import Profile from './pages/Profile'

const Auth = createSwitchNavigator({
    Initial,
    Login, 
    Register
})

const App = createBottomTabNavigator({
    Main,
    Register,
    Profile
})


export default createAppContainer(createSwitchNavigator({
    Auth,
    App
}))