/* Request */

export interface UploadImageRequest {
  path: 'users' | 'diaries';
  imageFormData: FormData;
}

/* Response */

export interface UploadImageResponse {
  imgUrl: string;
}
