import React, { Component } from 'react'
import { PermissionsAndroid, View, Text, StyleSheet, Image } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box"

import locationIcon from '../assets/location.png'
import expandIcon from '../assets/expand_blue.png'

const GOOGLE_API_KEY = 'AIzaSyD2Ubmyq_B4RedV4eCPnGuiBVqwUVobVBs'

export default new class Location {

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

    getLocation() {
        let coords = {}
        return new Promise(function (resolve, reject) {
            Geolocation.getCurrentPosition(resolve, reject)
        })

    }

    async getLocationFromAddress(address) {
        try {
            Geocoder.init(GOOGLE_API_KEY)
            const location = await Geocoder.from(address)
            console.log(location.results[0].geometry.location)
            return location.results[0].geometry.location
        } catch (error) {
            console.log(error)
        }
    }

    async getAddress(latitude, longitude) {
        Geocoder.init(GOOGLE_API_KEY)
        const jsonLocation = await Geocoder.from({ latitude, longitude })
        const message = jsonLocation.results[0].address_components[1].long_name
        return message
    }



}
