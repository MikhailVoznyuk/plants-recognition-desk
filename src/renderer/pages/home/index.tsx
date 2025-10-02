import { useState, useRef, useEffect } from 'react';
import process from '@/lib/model/process';
import { Link } from 'react-router';
import ImageProvider from '@components/ImageProvider/ImageProvider';
import LoadedContainer from '@components/LoadedContainer/LoadedContainer';
import LoadingBlock from '@components/loadingBlock/LoadingBlock';
import Button from '@ui/Button/Button';

import * as styles from './style.module.css';

import PickedImage, { PickedImagePreview } from '@/types/PickedImage';

export default function HomePage() {
  const images = useRef<PickedImage[]>([]);
  const [previewImages, setPreviewImages] = useState<PickedImagePreview[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [reportsCounter, setReportsCounter] = useState([0, 0]);

  const submit = async () => {
    setIsSubmitted(true);

    let ind = 0;
    while (ind < images.current.length) {
      // eslint-disable-next-line no-await-in-loop
      await process(images.current[ind]);

      setReportsCounter([reportsCounter[0], ind + 1]);
      ind++;
    }
    console.log('done');
  };

  useEffect(() => {
    if (isSubmitted && reportsCounter[0] === reportsCounter[1]) {
      console.log('useEffect fires');
      images.current = [];
      setPreviewImages([]);
      setReportsCounter([images.current.length, 0]);
      setIsSubmitted(false);
    }
  }, [isSubmitted, reportsCounter, images.current.length]);

  useEffect(() => {
    const onOnline = () => window.electron.queue.triggerSync();
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, []);

  return (
    <div className={styles.container}>
      {!isSubmitted ?
        <ImageProvider
          images={images}
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
          reportsCounter={reportsCounter}
          setReportsCounter={setReportsCounter}
        />
        : null
      }
      {previewImages.length > 0 && !isSubmitted ? (
        <LoadedContainer
          images={images}
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
        />
      ) : null}
      {images.current.length > 0 && !isSubmitted ?
        <Button className={styles.submitButton} callback={submit}>
          <span>Начать анализ</span>
        </Button>
        : null
      }
      {isSubmitted ? <LoadingBlock reportsCounter={reportsCounter} /> : null}
    </div>
  );
}
