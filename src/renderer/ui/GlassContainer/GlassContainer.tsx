import React from "react";
import {View, ViewProps, StyleSheet, Animated} from 'react-native';
import BlurLayer from "@/ui/BlurContainer/BlurLayer";

type GlassContainerProps = {
    style?: ViewProps['style'],
    contentContainerStyle?: ViewProps['style'],
    animate?: boolean,
    children: React.ReactNode
}

export default function GlassContainer({children, ...props}: GlassContainerProps) {

    return (
        <View style={[styles.glassContainer, styles.elevation, props.style ?? null]}>
            <BlurLayer/>
            {props.animate ?
                <Animated.View style={[styles.contentContainer, props.contentContainerStyle ?? null]}>
                    {children}
                </Animated.View>
                :
                <View style={[styles.contentContainer, props.contentContainerStyle ?? null]}>
                    {children}
                </View>
            }

        </View>

    )
}

const styles = StyleSheet.create({
    glassContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.7)',
    },
    contentContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    elevation: {
        elevation: 4,
        shadowColor: '#000'
    }
})