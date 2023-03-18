import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import SendAvtiveIcon from 'assets/icons/send_active.svg';
import SendIcon from 'assets/icons/send_inactive.svg';

const DiaryCommentInput = () => {
  const [isActiveSendButton, setIsActiveSendButton] = useState<boolean>(false);
  const commentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaAutosize = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
    setIsActiveSendButton(element.value.trim().length > 0);
  };

  return (
    <CommentInputContainer>
      <CommentTextareaBox>
        <CommentTextarea
          id="diaryCommentTextarea"
          placeholder="댓글을 입력해주세요."
          rows={1}
          ref={commentTextareaRef}
          onChange={() => {
            handleTextareaAutosize(
              commentTextareaRef.current as HTMLTextAreaElement,
            );
          }}
        />
        <CommentSendButton type="submit">
          {isActiveSendButton ? <SendAvtiveIcon /> : <SendIcon />}
        </CommentSendButton>
      </CommentTextareaBox>
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

const CommentTextareaBox = styled.div`
  display: grid;
  grid-template-columns: auto 20px;
  align-items: center;
  padding: 7px 12px 7px 14px;
  border-radius: 34px;
  background-color: ${({ theme }) => theme.colors.bg_fafafa};
`;

const CommentTextarea = styled.textarea`
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
`;

const CommentSendButton = styled.button`
  font-size: 0;
`;
