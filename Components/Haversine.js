import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import HaversineGeolocation from 'haversine-geolocation'

export default function Haversine() {
  const [firstLat, setFirstLat] = useState([])
  const [firstLong, setFirstLong] = useState(0)
  const [secondLat, setSecondLat] = useState(0)
  const [secondLong, setSecondLong] = useState(0)
  const [object, setObject] = useState([])

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
  ]

  const go = () => {
    setObject(
      HaversineGeolocation.getDistanceBetween(firstLat, points[3]) // 1133.1 km
    )
  }

  const findDistance = () => {
    HaversineGeolocation.isGeolocationAvailable().then(data => {
      const currentPoint = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        accuracy: data.coords.accuracy
      }
      setFirstLat(currentPoint)
    })
  }

  useEffect(() => {
    findDistance()
  }, [])

  return (
    <View>
      <Text style={styles.con}>Haversine</Text>
      <Button title="Find Distance" onPress={() => go()} />
      <Text style={{ textAlign: 'center' }}>{object} Miles</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  con: {
    color: 'red',
    textAlign: 'center'
  }
})
