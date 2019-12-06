import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Home from './Components/Home'
import Map from './Components/Map'
import Hell from './Components/Hell'
import Haversine from './Components/Haversine'

export default function App() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Map />
        <Home />
        <Hell />
        <Haversine />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
