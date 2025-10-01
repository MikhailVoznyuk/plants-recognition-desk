interface PickedImage {
  filename: string;
  fileBuffer: ArrayBuffer;
}

export interface PickedImagePreview {
  filename: string;
  imagePreview: string;
}

export default PickedImage;
