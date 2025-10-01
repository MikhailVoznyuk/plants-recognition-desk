import React from 'react';
import GlassContainer from '@ui/GlassContainer/GlassContainer';
import { useDropzone } from 'react-dropzone';
import type PickedImage from '@/types/PickedImage';
import type { PickedImagePreview } from '@/types/PickedImage';

import imagePath from '../../../../assets/images/add_image.svg';
import * as styles from './styles.module.css';



type ImageProviderProps = {
  previewImages: PickedImagePreview[];
  setPreviewImages: React.Dispatch<React.SetStateAction<PickedImagePreview[]>>;
  images: React.RefObject<PickedImage[]>;
  reportsCounter: number[];
  setReportsCounter: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function ImageProvider({
  images,
  previewImages,
  setPreviewImages,
  setReportsCounter,
}: ImageProviderProps) {

  const onDrop = React.useCallback( async (files: File[]) => {
    const newImages: PickedImage[] = [];
    const newPreviewImages: PickedImagePreview[] = [];
    for (const file of files) {
      // eslint-disable-next-line no-await-in-loop
      const buf = await file.arrayBuffer();
      newImages.push({
        filename: file.name,
        fileBuffer: buf,
      });
      newPreviewImages.push({
        filename: file.name,
        imagePreview: URL.createObjectURL(file),
      });
    }
    images.current = images.current.concat(newImages);
    setPreviewImages(previewImages.concat(newPreviewImages));
    setReportsCounter([newImages.length, 0]);
  });

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { 'image/*': [] },
    multiple: true,
    useFsAccessApi: false,
    onDrop,
  });
  return (
    <GlassContainer
      className={styles.imagePicker}
      contentContainerClassName={styles.contentContainer}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div
        className="flex col align-center"
        {...getRootProps()}
        style={{ cursor: 'pointer' }}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...getInputProps()} />
        <img className={styles.image} src={imagePath} alt="Pick images" />
        <p>
          Перетащите в это окно файлы с изображением дерева / куста, или
          кликните внутри окна чтобы выбрать их из проводника
        </p>
      </div>
    </GlassContainer>
  );
}
