import { VALID_VALUE } from './Value';

export const ERROR_MESSAGE = {
  commentMaxLength: `댓글은 공백을 포함하여 ${VALID_VALUE.commentMaxLength}자까지 작성이 가능합니다.`,
  email: {
    required: '이메일을 입력해주세요.',
    pattern: '올바른 이메일 형식이 아닙니다.',
  },
  username: {
    required: '닉네임을 입력해주세요.',
    length: '6~20자 이내로 입력해주세요.',
    pattern: '영어, 숫자, 특수문자 중 최소 2가지를 조합해주세요.',
    invalidPattern:
      '특수 문자는 ~, !, @, #, $, %, ^, *, -, _ 만 사용할 수 있습니다.',
  },
  password: {
    required: '비밀번호를 입력해주세요.',
    length: '6~30자 이내로 입력해주세요.',
    pattern: '영어, 숫자, 특수문자 중 최소 2가지를 조합해주세요.',
    invalidPattern: '사용할 수 없는 문자입니다.',
  },
  passwordCheck: {
    required: '비밀번호를 확인해주세요.',
    pattern: '비밀번호가 동일하지 않습니다.',
  },
};
