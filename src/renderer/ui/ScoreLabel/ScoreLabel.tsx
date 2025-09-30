import {View, Text, StyleSheet} from 'react-native'

const COLORS_SCORE = {
    1: {backgroundColor: '#13DE00',textColor: '#FFF'},
    2: {backgroundColor: '#FFAF1C',textColor: '#696767'},
    3: {backgroundColor: '#FF0000',textColor: '#FFF'},
}

type ScoreLabelProps = {
    score: 1 | 2 | 3;
    text: string;
}

export default function ScoreLabel(props: ScoreLabelProps) {

    return (
        <View style={[styles.scoreLabel, {backgroundColor: COLORS_SCORE[props.score].backgroundColor}]}>
            <Text style={[styles.scoreText, {color: COLORS_SCORE[props.score].textColor}]}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    scoreLabel: {
        alignSelf: "flex-end",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    scoreText: {
        fontSize: 16
    }
})
