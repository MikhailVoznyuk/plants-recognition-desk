import {StyleSheet} from 'react-native'
import {BlurView} from "@react-native-community/blur";

export default function BlurLayer() {
    return (
        <BlurView
            style={styles.blurLayer}
            blurType='light'
            blurAmount={10}
        />
    )
}

const styles = StyleSheet.create({

    blurLayer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.24)'
    }
})