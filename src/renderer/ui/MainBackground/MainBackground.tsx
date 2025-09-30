import React from 'react'
import {View, ImageBackground, StyleSheet} from "react-native";

export default function MainBackground({children}: {children: React.ReactNode}) {
    return (
        <ImageBackground
            source={require('@/assets/images/background.jpg')}
            blurRadius={0}
            style={styles.backgroundImage}
        >
            <View style={styles.backgroundBlur}></View>
            {children}
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    backgroundBlur: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        elevation: 0,
    },

})