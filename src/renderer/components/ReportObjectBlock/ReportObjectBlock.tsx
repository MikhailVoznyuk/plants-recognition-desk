import {useState, useRef} from 'react';

import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import Image from 'expo-image';
import ScoreLabel from "@/ui/ScoreLabel/ScoreLabel";
import GlassContainer from "@/ui/GlassContainer/GlassContainer";
import Button from "@/ui/Button/Button";
import type {ReportObject} from "@/types/Report";

type ReportObjectProps = {
    data: ReportObject;
    id: number;
}

const NAMES_HASH = {
    tree: 'Дерево',
    shrub: 'Куст'
}
const ANIM_WIDTH = {
    labels: [110, 190],
    content: [200, 420]
}

const DUR = 400
export default function ReportObjectBlock({data, id}: ReportObjectProps ) {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const lAnim = useRef(new Animated.Value(ANIM_WIDTH.labels[0])).current;
    const hAnim = useRef(new Animated.Value(ANIM_WIDTH.content[0])).current;
    const onClick = () => {

        go(!isOpened);
        setIsOpened(!isOpened);
    }
    const go = (state: boolean) => {
        if (state == isOpened) return;
        Animated.parallel([
            Animated.timing(lAnim, {
                toValue: ANIM_WIDTH.labels[+state],
                duration: DUR,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false,
            }),
            Animated.timing(hAnim, {
                toValue: ANIM_WIDTH.content[+state],
                duration: DUR,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false,
            }),
        ]).start();
    }

    return (
        <GlassContainer style={[styles.objectBlockContainer]} animate contentContainerStyle={[styles.objectBlock, {height: hAnim}]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{`Объект № ${id}`}</Text>
            </View>
            <View style={styles.columnBlock}>
                <View style={[styles.col, styles.textBlock]}>
                    <Text style={styles.text}>{`Тип: ${NAMES_HASH[data.plantType]}`}</Text>
                    <Text style={styles.text}>{`Порода: ${data.species}`}</Text>
                </View>
                <Animated.View style={[styles.col, styles.labelBlock, {height: lAnim}]}>
                    <ScoreLabel score={data.healthScore} text={`Здоровье: ${data.healthScore}`} />
                    <ScoreLabel score={data.crackScore} text={`Повреждения: ${data.crackScore}`} />
                    <ScoreLabel score={data.cavityScore} text={`Полости: ${data.cavityScore}`} />
                    <ScoreLabel score={data.fungusScore} text={`Грибок: ${data.fungusScore}`} />
                    <ScoreLabel score={data.fungusScore} text={`мех. повреждения: ${data.mechDamageScore}`} />
                </Animated.View>

            </View>
            <View style={styles.textSection}>
                {isOpened ?
                    <Text style={styles.text}>{data.description}</Text>
                    : null
                }
            </View>
            <Button style={styles.button} callback={onClick}>
                    <Text style={styles.buttonText}>{!isOpened ? 'Подробнее' : 'Свернуть'}</Text>
            </Button>
        </GlassContainer>
    )
}

const styles = StyleSheet.create({
    objectBlockContainer: {
        position: 'relative',
        padding: 0,
        width: 330,
    },
    objectBlock: {
        width: '100%',

        position: 'relative',
        justifyContent: 'flex-start',
        padding: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 50,
        overflow: 'hidden',
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
    columnBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        paddingTop: 20,
        gap: 10,
    },

    col: {
        alignItems: 'flex-start',
        gap: 10
    },
    textBlock: {
        paddingTop: 30,
    },
    labelBlock: {

        overflow: 'hidden',
    },
    button: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: '#03C317',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
    },
    textSection: {
        paddingHorizontal: 20,
    },
    text: {
        color: '#515151',
        fontSize: 16,
    }
})