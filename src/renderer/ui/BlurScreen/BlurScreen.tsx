import React from 'react';
import {StyleSheet} from "react-native";
import BlurLayer from "@/ui/BlurContainer/BlurLayer";

type BlurScreenProps = {
    children: React.ReactNode;
}
export default function BlurScreen({children} : BlurScreenProps) {
    return (
        <BlurLayer>

        </BlurLayer>
    )
}