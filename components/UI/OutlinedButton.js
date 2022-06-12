import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function OutlinedButton({ onPress, icon, children }) {
    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.pressed,
                ]}
                onPress={onPress}
            >
                <Ionicons
                    style={styles.icon}
                    name={icon}
                    size={18}
                    color={Colors.primary500}
                />
                <Text style={styles.text}> {children} </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 150,
        paddingHorizontal: 14,
        paddingVertical: 10,
        margin: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.primary500,
        borderRadius: 5,
    },
    pressed: {
        opacity: 0.75,
    },
    icon: {
        marginRight: 6,
    },
    text: {
        color: Colors.primary500,
    },
});
