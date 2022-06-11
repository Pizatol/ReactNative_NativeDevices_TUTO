import React from "react";
import { StyleSheet,Alert, Text, View, Button } from "react-native";
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
} from "expo-image-picker";

export default function ImagePicker() {
    const [cameraPermissionInformation, requestPermission] =
        useCameraPermissions();

    const verifyPermissions = async () => {
        if (
            cameraPermissionInformation.status === PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }
		  if(cameraPermissionInformation.status === PermissionStatus.DENIED){
			Alert.alert("Insufficient Permissions ! ", "You need to grant camera permissions to use this app.")
			return false;
		  }
		  return true;
    };

    const takeImageHandler = async () => {
		const hasPermission =  await verifyPermissions();

		if(!hasPermission){
			return;
		}

		const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        console.log(image);
    };

    return (
        <View>
            <View></View>
            <Button title="Take Image" onPress={takeImageHandler} />
        </View>
    );
}

const styles = StyleSheet.create({});
