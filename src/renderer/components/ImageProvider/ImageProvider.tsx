import React from 'react';

import GlassContainer from '@ui/GlassContainer/GlassContainer';
import Button from '@ui/Button/Button';

import type PickedImage from '@/types/PickedImage';

type ImageProviderProps = {
  inputType: number;
  images: PickedImage[];
  setImages: React.Dispatch<React.SetStateAction<PickedImage[]>>;
  reportsCounter: number[];
  setReportsCounter: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function ImageProvider({
  inputType,
  images,
  setImages,
  setReportsCounter,
}: ImageProviderProps) {
  const blockContent = [
    {
      textLabel:
        'Выберите фотографии с изображением растения из вашей галлереи.',
      buttonLabel: 'Выбрать фото',
    },
    {
      textLabel: 'Сделайте фотографию растения.',
      buttonLabel: 'Сделать фото',
    },
  ];

  const getImages = async () => {
    let result;
    if (inputType === 0) {
      try {
        result = await ImagePicker.openPicker({
          mediaType: 'photo',
          multiple: true,
        });
        const newImagesArr = images.concat(result);
        setImages(newImagesArr);
        setReportsCounter([newImagesArr.length, 0]);
      } catch (error) {
        console.log('Input cancelled');
      }
    } else {
      try {
        result = await ImagePicker.openCamera({
          mediaType: 'photo',
        });
        const newImagesArr = images.concat([result]);
        setImages(newImagesArr);
        setReportsCounter([newImagesArr.length, 0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <GlassContainer
      style={styles.imagePicker}
      contentContainerStyle={styles.contentContainer}
    >
      <Image
        style={styles.image}
        source={require('@/assets/images/add_image.svg')}
        transition={300}
      />
      <Text style={styles.text}>
        {inputType === 1 ? blockContent[1].textLabel : blockContent[0].textLabel}
      </Text>
      <Button callback={getImages}>
        <Text style={styles.buttonText}>
          {inputType == 1
            ? blockContent[1].buttonLabel
            : blockContent[0].buttonLabel}
        </Text>
      </Button>
    </GlassContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#515151',
    textAlign: 'center',
    fontSize: 22,
  },
  imagePicker: {
    width: 320,
    height: 384,
    justifyContent: 'flex-start',
  },

  contentContainer: {
    justifyContent: 'flex-start',
    gap: 24,
    paddingVertical: 34,
  },

  image: {
    width: 140,
    height: 140,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
    textAlign: 'center',
  },
});
