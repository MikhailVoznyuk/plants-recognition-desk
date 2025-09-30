import {Text, StyleSheet} from "react-native";
import {Link} from "expo-router";
import GlassContainer from "@/ui/GlassContainer/GlassContainer";

export default function LoadingBlock({reportsCounter}: {reportsCounter: number[]}) {
    return (
        <GlassContainer>
            <Text>{`Обработано ${reportsCounter[1]} из ${reportsCounter[0]}`}</Text>
            {(reportsCounter[1] > 0) ?
                <Link style={styles.linkButton} href={'/reports'}></Link> :
                null
            }
        </GlassContainer>
    )
}

const styles = StyleSheet.create({
    linkButton: {
        backgroundColor: '#03C317',
        fontSize: 20,
        color: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 30,
    }
})