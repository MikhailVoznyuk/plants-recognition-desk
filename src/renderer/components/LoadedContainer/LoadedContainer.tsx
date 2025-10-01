import React from 'react';
import PickedImage from '@/types/PickedImage';
import type { PickedImagePreview } from '@/types/PickedImage';
import GlassContainer from '@ui/GlassContainer/GlassContainer';
import Button from '@ui/Button/Button';
import * as styles from './styles.module.css';

type LoadedContainerProps = {
  images: React.RefObject<PickedImage[]>;
  previewImages: PickedImagePreview[];
  setPreviewImages: React.Dispatch<React.SetStateAction<PickedImagePreview[]>>;
};

export default function LoadedContainer({
  images,
  previewImages,
  setPreviewImages,
}: LoadedContainerProps) {
  const removeImage = (imageName: string, isPreview: boolean) => {
    if (isPreview) {
      setPreviewImages(
        previewImages.filter((image) => image.filename !== imageName),
      );
    } else {
      images.current = images.current.filter(
        (image) => image.filename !== imageName,
      );
    }
  };
  return (
    <GlassContainer
      className={styles.container}
      contentContainerClassName={styles.content}
    >
      {previewImages.map((image, index) => {
        const fileName = image.filename
          ? `${image.filename.slice(0, 10)}...`
          : `photo-${index}`;
        return (
          <div key={fileName} className={styles.imageRow}>
            <img
              className={styles.imagePreview}
              alt="picked tree or shrub"
              src={image.imagePreview}
            />
            <span className={styles.text}>{fileName}</span>
            <Button
              callback={() => {
                removeImage(image.filename ?? fileName, true);
                removeImage(image.filename ?? fileName, false);
              }}
              className={styles.deleteButton}
            >
              <span className={styles.buttonText}>Убрать</span>
            </Button>
          </div>
        );
      })}
    </GlassContainer>
  );
}
