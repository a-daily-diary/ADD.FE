import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FormEventHandler } from 'react';
import SendAvtiveIcon from 'assets/icons/send_active.svg';
import SendIcon from 'assets/icons/send_inactive.svg';
import { ERROR_MESSAGE } from 'constants/validation/Message';
import { VALID_VALUE } from 'constants/validation/Value';
import textareaAutosize from 'utils/TestareaAutosize';

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
    formState: { errors },
  } = useForm<DiaryCommentInputProps>({ mode: 'onChange' });
  const { content: contentValue } = getValues();
  const { content: contentError } = errors;

  const [isActiveSendButton, setIsActiveSendButton] = useState<boolean>(false);

  const handleTextarea: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const element = e.target as HTMLTextAreaElement;
    textareaAutosize(element);
    setIsActiveSendButton(element.value.trim().length > 0);
  };

  useEffect(() => {
    if (contentError?.type === 'maxLength') {
      setValue('content', contentValue.slice(0, VALID_VALUE.commentMaxLength));
      alert(contentError.message);
    }
  }, [contentError]);

  useEffect(() => {
    if (router.query.focus === 'comment') {
      setFocus('content');
    }
  }, [setFocus]);

  return (
    <CommentInputContainer>
      <CommentForm>
        <CommentTextarea
          id="diaryCommentTextarea"
          placeholder="댓글을 입력해주세요."
          rows={1}
          {...register('content', {
            maxLength: {
              value: VALID_VALUE.commentMaxLength,
              message: ERROR_MESSAGE.commentMaxLength,
            },
            onChange: handleTextarea,
          })}
        />
        <CommentSendButton type="submit">
          {isActiveSendButton ? <SendAvtiveIcon /> : <SendIcon />}
        </CommentSendButton>
      </CommentForm>
    </CommentInputContainer>
  );
};

export default DiaryCommentInput;

const CommentInputContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 10px 20px 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_eee};
  background-color: ${({ theme }) => theme.colors.white};
`;

const CommentForm = styled.form`
  display: grid;
  grid-template-columns: auto 20px;
  align-items: center;
  padding: 7px 12px 7px 14px;
  border-radius: 34px;
  background-color: ${({ theme }) => theme.colors.bg_fafafa};
`;

const CommentTextarea = styled.textarea`
  max-height: 79px;
  padding: 0;
  border: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.02em;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_999};
    font-size: 14px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.02em;
  }

  &:focus {
    outline: 0;
  }
`;

const CommentSendButton = styled.button`
  font-size: 0;
`;
