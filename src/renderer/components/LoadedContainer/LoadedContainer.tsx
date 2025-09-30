import React from 'react';

import {Image} from 'expo-image'
import {View, Text, StyleSheet} from "react-native";

import GlassContainer from "@/ui/GlassContainer/GlassContainer";
import Button from "@/ui/Button/Button";

import type PickedImage from "@/types/PickedImage";

type LoadedContainerProps = {
    images: PickedImage[],
    setImages: React.Dispatch<React.SetStateAction<PickedImage[]>>
}

export default function LoadedContainer(props: LoadedContainerProps) {
    const removeImage = (filename: string) => {
        for (let i = 0; i < props.images.length; i++) {
            if (props.images[i].filename == filename) {
                props.setImages(props.images.slice(0, i).concat(props.images.slice(i + 1)))
                return
            }
        }
    }
    return (
        <GlassContainer style={styles.container} contentContainerStyle={styles.content}>
            {props.images.map((image, index) => {
                const fileName = image.filename ? `${image.filename.slice(0,10)}...` : `photo-${index}`;
                return (
                    <View key={fileName} style={styles.imageRow}>
                        <Image style={styles.imagePreview} source={image.path} />
                        <Text style={styles.text}>{fileName}</Text>
                        <Button callback={() => removeImage(image.filename ?? fileName)} style={styles.deleteButton}>
                            <Text style={styles.buttonText}>Убрать</Text>
                        </Button>
                    </View>
                )
            })}
        </GlassContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 330,

    },
    content: {
        padding: 14,
        gap: 14

    },
    imageRow: {
        flex: 0,
        position: 'relative',
        height: 60,
        width: 302,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },

    imagePreview: {
        width: 60,
        height: 60,
        borderRadius: 12,
    },
    deleteButton: {
        position: 'absolute',
        width: 80,
        height: 30,
        right: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: 'red',
        justifyContent: 'center',
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#FFF',
    },
    text: {
        color: '#515151',
        fontSize: 20,
    }
})