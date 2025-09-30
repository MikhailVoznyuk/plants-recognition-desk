import React from 'react'
import {Pressable, ViewProps, StyleSheet} from "react-native";

type ButtonProps = {
    style?: ViewProps['style'],
    children: React.ReactNode,
    callback: (...args: unknown[]) => unknown
}

export default function Button({children, ...props} : ButtonProps) {
    return (
        <Pressable style={[styles.button, props.style ?? null]} onPress={props.callback}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        color: '#FFF',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#03C317',
        alignSelf: 'center',

    }
})

