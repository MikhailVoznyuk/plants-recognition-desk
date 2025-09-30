import react from 'react';


import {View, Text, StyleSheet} from 'react-native';
import {Image} from "expo-image";
import {Link} from "expo-router";

import GlassContainer from "@/ui/GlassContainer/GlassContainer";
import Button from "@/ui/Button/Button";

import type Report from "@/types/Report";

export default function ReportPreview({reportData}: {reportData: Report}) {

    return (
        <GlassContainer style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{`Отчет - ${reportData.id.slice(0, 5)}`}</Text>
            </View>
            <View style={styles.content}>
                <Image style={styles.contentImage}  source={reportData.imageFile} />
                <View style={styles.textContainer}>
                    <Text style={styles.contentText}>{`Дата: ${reportData.date}`}</Text>
                    <Text style={styles.contentText}>{`Объектов на фото: ${reportData.objects.length}`}</Text>
                </View>
            </View>
                <Link  style={styles.button} href={{pathname: '/reports/[id]', params: {id: reportData.id}}}>Открыть</Link>
        </GlassContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        height: 150,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingVertical: 0,
    },
    contentContainer: {
        height: 150,

        position: "relative",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 0,
        paddingVertical: 0,

    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: '#03C317',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
    },
    headerText: {
        color: "#FFF",
        fontSize: 18,
    },
    contentImage: {
        width: 112,
        height: 70,
        borderRadius: 10
    },
    contentText: {
        width: 174,
        justifyContent: 'flex-start',
    },
    content: {
        width: 320,
        marginTop: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
        paddingHorizontal: 10
    },
    textContainer: {

    },
    button: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: '#03C317',
        paddingHorizontal: 14,
        paddingVertical: 6,
        color: '#FFF',
        fontSize: 20,
        borderRadius: 20
    }

})
