import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

export default class Hell extends Component {
  state = {
    locationResult: null
  }

  _getLocationAsync = async e => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied'
      })
      // console.log(this.state.location)
    }

    let place = await Location.getCurrentPositionAsync({})
    this.setState({ locationResult: JSON.stringify(place) })
  }

  render() {
    return (
      <View>
        <Text>123</Text>
        <Button title="Press" onPress={e => this._getLocationAsync(e)} />
      </View>
    )
  }
}
