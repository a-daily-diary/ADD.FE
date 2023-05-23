export interface LoginForm {
  email: string;
  password: string;
}

/*
 * Request Data Types
 */

// 로그인
export type LoginRequest = LoginForm;

/*
 * Response Data Types
 */

// 로그인
export interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      username: string;
      imgUrl: string;
      isAdmin: boolean; // TODO: API에서 데이터 구조 수정 필요
    };
  };
}
