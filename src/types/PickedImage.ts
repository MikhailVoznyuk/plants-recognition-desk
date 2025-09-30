
import type {Image} from 'react-native-image-crop-picker'

interface PickedImage extends Omit<Image, 'filename'> {
    filename?: string | undefined
}

export default PickedImage