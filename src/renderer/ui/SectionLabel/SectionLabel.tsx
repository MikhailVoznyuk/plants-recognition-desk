import {View, Text, StyleSheet} from 'react-native';

type SectionLabelProps = {
    text: string;
}
export default function SectionLabel({text} : SectionLabelProps) {
    return (
        <View style={styles.sectionLabel}>
            <Text style={styles.textLabel}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionLabel: {
        alignSelf: 'flex-start',
        backgroundColor: '#03C317',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    textLabel: {
        fontSize: 18,
        fontWeight: "normal",
        color: '#FFF',
    }
})