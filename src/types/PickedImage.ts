interface PickedImage {
  filename?: string | undefined;
  fileBuffer: ArrayBuffer;
}

export interface PickedImagePreview {
  filename: string | undefined;
  imagePreview: string;
}

export default PickedImage;
