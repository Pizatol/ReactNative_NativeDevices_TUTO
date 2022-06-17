import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

export default function PlaceForm({ onCreatePlace }) {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [selectImage, setSelectImage] = useState();
    const [pickLocation, setPickLocation] = useState();

    const changeTitleHandler = (enteredText) => {
        setEnteredTitle(enteredText);
    };

    const takeImageHandler = (imageUri) => {
        setSelectImage(imageUri);
    };

    const pickLocationHandler = useCallback((location) => {
        setPickLocation(location);
    }, []);

    const savePlaceHandler = () => {
        const placeData = new Place(enteredTitle, selectImage, pickLocation);
        onCreatePlace(placeData);
    };

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={enteredTitle}
                />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onLocationPick={pickLocationHandler} />
            <Button onPress={savePlaceHandler}> Add Place</Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderWidth: 2,
        backgroundColor: Colors.primary100,
    },
});
