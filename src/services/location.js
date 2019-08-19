import React, { Component } from 'react'
import { PermissionsAndroid, View, Text, StyleSheet, Image } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import locationIcon from '../assets/location.png'
import expandIcon from '../assets/expand_blue.png'

const GOOGLE_API_KEY = 'AIzaSyD2Ubmyq_B4RedV4eCPnGuiBVqwUVobVBs'

export default class Location extends Component {

    state = {
        coords: { latitude: 0, longitude: 0 },
        messageLocation: 'Buscando sua localização...'
    }
    async componentDidMount() {
        const permission = this.requestPermission()
        if (permission) {
            await this.getLocation()
        } else {
            this.setState({
                messageLocation: 'Não encontramos sua localização :('
            })
        }
    }

    async requestPermission() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) return true

        return false
    }

    async getLocation() {
        await Geolocation.getCurrentPosition(info => {
            this.setState({
                coords: { latitude: info.coords.latitude, longitude: info.coords.longitude }
            })

            this.getAddress(info.coords.latitude, info.coords.longitude)
        })
    }

    async getAddress(latitude, longitude) {
        Geocoder.init(GOOGLE_API_KEY)
        const jsonLocation = await Geocoder.from({latitude, longitude})
        const message = jsonLocation.results[0].address_components[1].long_name
        this.setState({
            messageLocation: message
        }) 
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.locationIcon} source={locationIcon}></Image>
                <Text style={styles.text}>{this.state.messageLocation}</Text>
                <Image style={styles.expandIcon} source={expandIcon}></Image>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center'
    },
    locationIcon: {
        width: 25,
        height: 25
    },
    text: {
        marginLeft: 5,
        fontFamily: 'Cabin',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#0E65E5'
    },
    expandIcon: {
        marginLeft: 15,
        width: 20,
        height: 20
    },
})