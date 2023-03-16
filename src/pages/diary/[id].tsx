import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import MoreIcon from 'assets/icons/more.svg';
import ReplyIcon from 'assets/icons/reply.svg';
import SendIcon from 'assets/icons/send_inactive.svg';
import DiaryDetail from 'components/diary/DiaryDetail';
import { COMMENT_LIST_MOCK_DATA } from 'mocks/CommentList';
import { DIARY_LIST_MOCK_DATA } from 'mocks/DiaryList';
import { dateFormat, timeFormat } from 'utils/Formatter';

interface CommentProps {
  id: number;
  authorUsername: string;
  authorThumbnailUrl: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

const DiaryDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [commentData, setCommentData] = useState<CommentProps[]>([]);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCommentData(COMMENT_LIST_MOCK_DATA);
  }, []);

  const handleReplyTextarea = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  // TODO: API 연동하기
  const data = DIARY_LIST_MOCK_DATA[Number(id)];

  if (data === undefined) return <div>Loading...</div>;

  return (
    <>
      <section>{data !== undefined && <DiaryDetail {...data} />}</section>
      <Section>
        {commentData.length !== 0 ? (
          <ul>
            {commentData.map((comment) => {
              const {
                authorThumbnailUrl,
                authorUsername,
                content,
                createdAt,
                id,
              } = comment;
              return (
                <Comment key={`comment-list-${id}`}>
                  <AuthorContainer>
                    {authorThumbnailUrl !== null && (
                      // TODO
                      // 1. 유저 프로필 이미지 클릭 시 해당 프로필로 이동
                      // 2. 프로필 이미지 컴포넌트 분리
                      <AuthorImageContainer>
                        <Image
                          src={authorThumbnailUrl}
                          alt={authorUsername}
                          width={20}
                          height={20}
                        />
                      </AuthorImageContainer>
                    )}
                    <UsernameText>{authorUsername}</UsernameText>
                    {/* TODO : #46 풀리퀘스트 머지 후 수정 */}
                    <CreatedAtText>
                      {timeFormat(createdAt) !== null
                        ? timeFormat(createdAt)
                        : dateFormat(createdAt)}
                    </CreatedAtText>
                    <MoreButton type="button">
                      <MoreIcon />
                    </MoreButton>
                  </AuthorContainer>
                  <Content>{content}</Content>
                </Comment>
              );
            })}
          </ul>
        ) : (
          <NoCommentText>
            아직 댓글이 없어요.
            <br />
            가장 먼저 댓글을 남겨보세요.
          </NoCommentText>
        )}
        <WriteReplyLabel htmlFor="replyTextarea">
          <ReplyIcon />
          <WriteReplyLabelText>댓글쓰기</WriteReplyLabelText>
        </WriteReplyLabel>
        <ReplyContainer>
          <ReplyBox>
            <ReplyTextarea
              id="replyTextarea"
              placeholder="댓글을 입력해주세요."
              rows={1}
              ref={replyTextareaRef}
              onChange={() => {
                handleReplyTextarea(
                  replyTextareaRef.current as HTMLTextAreaElement,
                );
              }}
            />
            <ReplyButton type="submit">
              <SendIcon />
            </ReplyButton>
          </ReplyBox>
        </ReplyContainer>
      </Section>
    </>
  );
};

export default DiaryDetailPage;

const Section = styled.section`
  margin-bottom: 92px;
  border-top: 6px solid ${({ theme }) => theme.colors.gray_eee};
`;

const Comment = styled.li`
  position: relative;
  padding: 12px 20px 16px;

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 20px;
    width: calc(100% - 40px);
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray_eee};
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 8px;
`;

const AuthorImageContainer = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 20px;
  aspect-ratio: 1;
  background-color: rgba(0, 0, 0, 0.2);
`;

const UsernameText = styled.span`
  margin: 0 6px 0 8px;
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
`;

const CreatedAtText = styled.span`
  color: ${({ theme }) => theme.colors.gray_999};
  font-size: 12px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.02em;
  text-align: right;
`;

const MoreButton = styled.button`
  position: absolute;
  right: 0;
`;

const Content = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.02em;
  word-break: keep-all;
`;

const NoCommentText = styled.p`
  margin: 40px 0 20px;
  color: ${({ theme }) => theme.colors.gray_999};
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
  text-align: center;
  letter-spacing: -0.02em;
`;

const WriteReplyLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 105px;
  height: 40px;
  margin: 20px auto 40px;
  border-radius: 120px;
  background-color: ${({ theme }) => theme.colors.bg_f4f4f4};
`;

const WriteReplyLabelText = styled.span`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.gray_666};
  font-size: 12px;
  font-weight: 500;
  line-height: 100%;
`;

const ReplyContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 10px 20px 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_eee};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ReplyBox = styled.div`
  display: grid;
  grid-template-columns: auto 20px;
  align-items: center;
  padding: 7px 12px 7px 14px;
  border-radius: 34px;
  background-color: ${({ theme }) => theme.colors.bg_fafafa};
`;

const ReplyTextarea = styled.textarea`
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
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: -0.02em;
  }
`;

const ReplyButton = styled.button`
  font-size: 0;
`;
