import styled from '@emotion/styled';
import { NoSearchResults } from './NoSearchResults';
import { CloseIcon } from 'assets/icons';
import { theme } from 'styles';

interface RecentSearchContainerProps {
  recentSearchKeywords: string[];
  onDeleteSearchKeyword: (value: string) => void;
  onDeleteAllSearchKeyword: () => void;
}

export const RecentSearchContainer = ({
  recentSearchKeywords,
  onDeleteSearchKeyword,
  onDeleteAllSearchKeyword,
}: RecentSearchContainerProps) => {
  const isEmptyRecentSearches = recentSearchKeywords.length === 0;

  return (
    <Container>
      <TitleContainer>
        <Title>최근 검색어</Title>
        {!isEmptyRecentSearches && (
          <DeleteAllButton type="button" onClick={onDeleteAllSearchKeyword}>
            전체 삭제
          </DeleteAllButton>
        )}
      </TitleContainer>
      {isEmptyRecentSearches ? (
        <NoSearchResults description="최근 검색어 내역이 없습니다." />
      ) : (
        <RecentSearchList>
          {recentSearchKeywords.map((recentSearchKeyword) => {
            return (
              <li key={recentSearchKeyword}>
                <RecentSearchButton
                  type="button"
                  onClick={() => {
                    onDeleteSearchKeyword(recentSearchKeyword);
                  }}
                >
                  {recentSearchKeyword}
                  <CloseIcon
                    width={16}
                    height={16}
                    stroke={theme.colors.gray_04}
                  />
                </RecentSearchButton>
              </li>
            );
          })}
        </RecentSearchList>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.headline_02}
`;

const DeleteAllButton = styled.button`
  color: ${({ theme }) => theme.colors.gray_04};
  ${({ theme }) => theme.fonts.body_06}
`;

const RecentSearchList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 18px;
`;

const RecentSearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.bg_01};
  ${({ theme }) => theme.fonts.body_05}
`;
