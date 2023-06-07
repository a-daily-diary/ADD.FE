/*
 * Request Data Types
 */

// 유저 이미지 업로드
export type UploadImageRequest = FormData;

/*
 * Response Data Types
 */

// 유저 이미지 업로드
export interface UploadImageResponse {
  imgUrl: string;
}
