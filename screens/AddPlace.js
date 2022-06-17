import React from 'react'


import { StyleSheet, Text, View } from 'react-native'
import PlaceForm from '../components/Places/PlaceForm'
import { insertPlace } from '../util/database'

export default function AddPlace({navigation}) {


  const createPlaceHandler = async (place) => {

    await insertPlace(place);

    navigation.navigate('AllPlaces')
  }

  return (
	<PlaceForm onCreatePlace={createPlaceHandler} />
  )
}

const styles = StyleSheet.create({})