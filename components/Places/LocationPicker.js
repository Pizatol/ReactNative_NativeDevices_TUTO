import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, Image } from "react-native";
import {
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus,
} from "expo-location";

import OutlinedButton from "../UI/OutlinedButton";

import { Colors } from "../../constants/colors";
import { getMapPreview } from "../../util/location";
import { useNavigation } from "@react-navigation/native";

export default function LocationPicker() {
    const [pickedLocation, setPickedLocation] = useState();

    const [locationPermissionInformation, requestPermission] =
        useForegroundPermissions();

   const navigation =  useNavigation();

    const verifyPermissions = async () => {
        if (
            locationPermissionInformation.status ===
            PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Insufficient Permissions ! ",
                "You need to grant location permissions to use this app."
            );
            return false;
        }
        return true;
    };
    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    };

    const pickOnMapHandler = () => {
        navigation.navigate('Map')
    };

    let locationPreview = <Text>No location picked yet!</Text>;

    if (pickedLocation) {
        locationPreview = (
            <Image
                style={styles.image}
                source={{
                    uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
                }}
            />
        );
    }

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>

            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mapPreview: {
        marginVertical: 8,
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
