import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import PlacesList from "../components/Places/PlacesList";

export default function AllPlaces({ route }) {
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused && route.params) {
            setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
        }
    }, [isFocused, route]);

    return <PlacesList places={loadedPlaces} />;
}

const styles = StyleSheet.create({});
