/*
 * Request Data Types
 */

// 유저 이미지 업로드
export interface UploadImageRequest {
  path: 'users' | 'diaries';
  imageFormData: FormData;
}

/*
 * Response Data Types
 */

// 유저 이미지 업로드
export interface UploadImageResponse {
  imgUrl: string;
}
