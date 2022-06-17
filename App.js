import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppLoading from "expo-app-loading";
import * as SplashScreen from 'expo-splash-screen';

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import PlaceDetails from "./screens/PlaceDetails";

import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import { useEffect, useState, useCallback } from "react";
import { init } from "./util/database";

const Stack = createNativeStackNavigator();

export default function App() {
    const [dbInitialized, setDbInitialized] = useState(false);

    useEffect(() => {

        // init().then(() => {
        //     setDbInitialized(true);
        // }).catch(error => {
        //     console.log(error);
        // });

        const prepare = async () => {
            try {
              await SplashScreen.preventAutoHideAsync();
              init();
            } catch (e) {
              console.warn(e);
            } finally {
              setDbInitialized(true);
            }
          };
          prepare();

    }, []);


    const onLayoutRootView = useCallback(
        async () => {
          if (dbInitialized) {
            await SplashScreen.hideAsync();
          }
        },
        [dbInitialized]
      );



    if(!dbInitialized) {
        // return <AppLoading />
        return null;
    }



    return (
        <>
            <StatusBar style="dark" />
            <NavigationContainer onReady={onLayoutRootView}>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: Colors.primary500 },
                        headerTintColor: Colors.gray700,
                        contentStyle: { backgroundColor: Colors.gray700 },
                    }}
                >
                    <Stack.Screen
                        name="AllPlaces"
                        component={AllPlaces}
                        options={({ navigation }) => ({
                            title: "Your favorite place",
                            headerRight: ({ tintColor }) => (
                                <IconButton
                                    icon="add"
                                    size={24}
                                    color={tintColor}
                                    onPress={() =>
                                        navigation.navigate("AddPlace")
                                    }
                                />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="AddPlace"
                        component={AddPlace}
                        options={{
                            title: "Add a new place",
                        }}
                    />
                    <Stack.Screen name="Map" component={Map} />
                    <Stack.Screen name='PlaceDetails' component={PlaceDetails} options={{
                        title: 'Loading Place...'
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
