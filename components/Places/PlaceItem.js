import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'

export default function PlaceItem({place, onSelect}) {
  return (
	 <Pressable onPress={onSelect}>
		<Image source={{src : place.imageUri}} />
		<View>
			<Text>{place.title}</Text>
			<Text>{place.address} </Text>
		</View>
	 </Pressable>
  )
}

const styles = StyleSheet.create({
	
})