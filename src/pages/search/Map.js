/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import MapboxGL from '@react-native-mapbox-gl/maps'

import Location from '../../services/location'
MapboxGL.setAccessToken('pk.eyJ1IjoiZnJhbmNpc2Nvc3ZhcmdhcyIsImEiOiJjanpibG90ZjEwMDMwM2RwbjU0ZThtM3pjIn0.R14V6c4zkc75SlrzmVW0Nw')

export default class Main extends Component {

	renderLocations = () => (
		this.props.navigation.state.params.data.map(location=> (
			<MapboxGL.PointAnnotation
				id={location._id}
				coordinate={[location.loc.coordinates[1], location.loc.coordinates[0]] }
			>

				{console.log(location.loc.coordinates)}
				<View style={styles.annotationContainer}>
					<Text>{location.price}</Text>
				</View>
				<MapboxGL.Callout title={location.name} />
			</MapboxGL.PointAnnotation>
		))
	)

	render() {
		return (
			<MapboxGL.MapView
				style={styles.container}
				showUserLocation={true}
				logoEnabled={false}
				attributionEnabled={false}
				styleURL={MapboxGL.StyleURL.White}
			>
				<MapboxGL.UserLocation />
				<MapboxGL.Camera
					followUserMode="course"
					followUserLocation={true}
					followZoomLevel={11}
					heading={10}
					pitch={50}
				/>
				{this.renderLocations()}
			</MapboxGL.MapView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	annotationContainer: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 15,
	},
	annotationFill: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#7159C1',
		transform: [{ scale: 0.8 }],
	},
	view: {
		flex: 1,
		position: "absolute"
	}
})

Main.navigationOptions = ({ navigation }) => ({

    title: 'Encontramos perto de você',
    headerTitleStyle: {
        textAlign: 'left',
        fontFamily: 'Raleway',
        fontSize: 20,
    },
    headerRightContainerStyle: {
        paddingRight: 20
    },

})

