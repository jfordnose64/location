import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import * as Location from 'expo-location'
import HaversineGeolocation from 'haversine-geolocation'

export default function Map() {
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [latOne, setLatOne] = useState(0)
  const [longOne, setLongOne] = useState(0)
  const [clicked, setClicked] = useState(false)
  const [distance, setDistance] = useState(0)
  const [object, setObject] = useState([])

  navigator.geolocation.watchPosition(
    position => {
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
      // console.log(lat)
      // setLocationState()
    },

    error => console.log(error),
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
      distanceFilter: 10
    }
  )

  const go = position => {
    // const currentPoint = {
    //   latitude: latOne,
    //   longitude: longOne
    // }

    const user = {
      latitude: lat,
      longitude: long
    }
    // setObject(
    //   HaversineGeolocation.getDistanceBetween(currentPoint, user) // 1133.1 km
    // )
    console.log(
      HaversineGeolocation.getDistanceBetween(position, user, 'mi') // 1133.1 km
    )
    // console.log(currentPoint)
    // console.log(user)
  }

  // setLocationState = () => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     setLatOne(position.coords.latitude)
  //     setLongOne(position.coords.longitude)
  //   })
  // }

  // find = () => {
  //   console.log('wow')
  //   console.log(marker.id)
  // }

  const position = []

  find = coordinate => {
    // console.log(coordinate.nativeEvent.coordinate.longitude)
    // setLatOne(coordinate.nativeEvent.coordinate.latitude)
    // setLongOne(coordinate.nativeEvent.coordinate.longitude)
    let position = {
      latitude: coordinate.nativeEvent.coordinate.latitude,
      longitude: coordinate.nativeEvent.coordinate.longitude
    }

    go(position)
  }

  const points = [
    {
      id: 1,
      title: 'Point 1',
      latitude: 61.5322204,
      longitude: 28.7515963
    },
    {
      id: 2,
      title: 'Point 2',
      latitude: 51.9971208,
      longitude: 22.1455439
    },
    {
      id: 3,
      title: 'Point 3',
      latitude: 45.3571207,
      longitude: 30.3435456
    },
    {
      id: 4,
      title: 'Home',
      latitude: 27.55,
      longitude: -82.444
    }
    // {
    //   id: 5,
    //   title: 'live',
    //   latitude: lat,
    //   longitude: long
    // }
  ]

  return (
    <View>
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          coordinate={{
            latitude: lat,
            longitude: long
          }}
          pinColor="red"
        />
        {points.map(marker => {
          return (
            <Marker
              key={marker.id}
              pinColor="blue"
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              title="Marker"
            >
              <Callout onPress={coordinate => this.find(coordinate)}>
                <View>
                  <Text>Distance</Text>
                  <Button title="Press" />
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: 415,
    height: 820,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
