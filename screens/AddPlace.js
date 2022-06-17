import React from 'react'


import { StyleSheet, Text, View } from 'react-native'
import PlaceForm from '../components/Places/PlaceForm'

export default function AddPlace({navigation}) {


  const createPlaceHandler = (place) => {
    navigation.navigate('AllPlaces', {
      place : place
    })
  }

  return (
	<PlaceForm onCreatePlace={createPlaceHandler} />
  )
}

const styles = StyleSheet.create({})