import React from "react";
import {useState, useRef} from 'react';
import {View, StyleSheet, Pressable, Text, Animated, Easing} from 'react-native';

import GlassContainer from "@/ui/GlassContainer/GlassContainer";


type ToggleBarProps = {
    callback: React.Dispatch<React.SetStateAction<number>>
}

const POS = [
    {x: 0, width: 120},
    {x: 140, width: 140}
];

const DUR = 440;

const INTERPOLATE = {
    inputRange: [0, 1],
    outputRange: ['#000', '#FFF']
}

export default function ToggleBar({callback}: ToggleBarProps) {
    const [curTab, setCurTab] = useState<number>(0);
    const tAnim = useRef(new Animated.Value(POS[0].x)).current;
    const wAnim = useRef(new Animated.Value(POS[0].width)).current;
    const cAnimFst = useRef(new Animated.Value(1)).current;
    const cAnimSnd = useRef(new Animated.Value(0)).current;

    const fstColor = cAnimFst.interpolate(INTERPOLATE);
    const sndColor = cAnimSnd.interpolate(INTERPOLATE);

    const go = (ind: number) => {
        if (ind == curTab) return;
        Animated.parallel([
            Animated.timing(tAnim, {
                toValue: POS[ind].x,
                duration: DUR,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false
            }),
            Animated.timing(wAnim, {
                toValue: POS[ind].width,
                duration: DUR,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false
            }),
            Animated.timing(cAnimFst, {
                toValue: +(ind == 0),
                duration: DUR,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false
            }),
            Animated.timing(cAnimSnd, {
                toValue: +(ind == 1),
                duration: DUR,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false
            })
        ]).start();
    }

    const onClick = ()=>  {
        const newTab = (curTab + 1) % 2;
        go(newTab);
        callback(newTab);
        setCurTab(newTab);
        console.log('clicked');
    };

    return (
        <GlassContainer
            style={styles.headerToggle}
            contentContainerStyle={styles.toggleBar}
        >
            <Animated.View style={[styles.barTab, {transform: [{translateX: tAnim}], width: wAnim}]}></Animated.View>
            <Pressable disabled={curTab === 0} style={styles.toggleTab} onPress={onClick}>
                <Animated.Text style={[styles.toggleTabText, {color: fstColor}]}>Фото</Animated.Text>
            </Pressable>
            <Pressable disabled={curTab === 1} style={styles.toggleTab} onPress={onClick}>
                <Animated.Text style={[styles.toggleTabText, {color: sndColor}]}>Камера</Animated.Text>
            </Pressable>
        </GlassContainer>
    )
}

const styles = StyleSheet.create({
    headerToggle: {
        width: 280,
        height: 60,
        borderRadius: 40,
        overflow: 'hidden',
    },
    toggleBar: {
        flex: 0,
        width: 280,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        paddingHorizontal: 10
    },
    toggleTab: {
        width: 100,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleTabText: {
        alignSelf: 'center',
        fontSize: 24,
    },
    barTab: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 120,
        height: '100%',
        backgroundColor: '#03C317',
        borderRadius: 50,
    },
})