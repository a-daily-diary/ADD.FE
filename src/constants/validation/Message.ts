import { VALID_VALUE } from './Value';

export const ERROR_MESSAGE = {
  commentMaxLength: `댓글은 공백을 포함하여 ${VALID_VALUE.commentMaxLength}자까지 작성이 가능합니다.`,
  email: '올바른 이메일 형식이 아닙니다.',
  username: '영어, 숫자, 특수문자로 구성해주세요.',
  password: '8-16자 사이의 영문, 숫자, 특수문자로 구성해주세요.',
  passwordCheck: '비밀번호가 동일하지 않습니다.',
};

export const REQUIRED_MESSAGE = {
  email: '이메일을 입력해주세요.',
  username: '닉네임을 입력해주세요.',
  password: '비밀번호를 입력해주세요.',
  passwordCheck: '비밀번호를 확인해주세요.',
};
