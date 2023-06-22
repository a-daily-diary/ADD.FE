import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SendActiveIcon, SendInactiveIcon } from 'assets/icons';
import { Z_INDEX } from 'constants/styles';
import { ERROR_MESSAGE } from 'constants/validation/Message';
import { VALID_VALUE } from 'constants/validation/Value';
import { SVGVerticalAlignStyle } from 'styles';
import { textareaAutosize } from 'utils';

interface DiaryCommentInputProps {
  content: string;
}

const DiaryCommentInput = () => {
  const router = useRouter();
  const {
    register,
    setValue,
    getValues,
    setFocus,
    formState: { errors, isValid },
  } = useForm<DiaryCommentInputProps>({ mode: 'onChange' });
  const { content: contentValue } = getValues();
  const { content: contentError } = errors;

  useEffect(() => {
    if (contentError?.type === 'maxLength') {
      setValue('content', contentValue.slice(0, VALID_VALUE.commentMaxLength));
      // TODO: 모달로 수정하기
      alert(contentError.message);
    }
  }, [contentError]);

  useEffect(() => {
    if (router.query.focus === 'comment') {
      setFocus('content');
    }
  }, [setFocus]);

  return (
    <Container>
      <Form>
        <Textarea
          id="diaryCommentTextarea"
          placeholder="댓글을 입력해주세요."
          rows={1}
          {...register('content', {
            required: true,
            maxLength: {
              value: VALID_VALUE.commentMaxLength,
              message: ERROR_MESSAGE.commentMaxLength,
            },
            onChange: textareaAutosize,
          })}
        />
        <SubmitButton type="submit" disabled={!isValid}>
          {isValid ? <SendActiveIcon /> : <SendInactiveIcon />}
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default DiaryCommentInput;

const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.dialog};
  padding: 10px 20px 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_06};
  background-color: ${({ theme }) => theme.colors.white};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: auto 20px;
  align-items: center;
  gap: 8px;
  padding: 7px 12px 7px 14px;
  border-radius: 17px;
  background-color: ${({ theme }) => theme.colors.bg_01};
`;

const Textarea = styled.textarea`
  max-height: 79px;
  color: ${({ theme }) => theme.colors.gray_00};
  ${({ theme }) => theme.fonts.body_07};
  word-break: keep-all;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_02};
  }
`;

const SubmitButton = styled.button`
  ${SVGVerticalAlignStyle}
`;
