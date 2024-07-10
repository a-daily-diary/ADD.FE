import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { NoSearchResults } from './NoSearchResults';
import type { SearchForm } from 'types/search';
import { CloseIcon } from 'assets/icons';
import { PAGE_PATH } from 'constants/common';
import { useSearchKeywordStorage } from 'hooks/common';
import { SVGVerticalAlignStyle, theme } from 'styles';

export const RecentSearchContainer = () => {
  const router = useRouter();

  const { setValue } = useFormContext<SearchForm>();

  const { keywords, handleDeleteSearchKeyword, handleDeleteAllSearchKeyword } =
    useSearchKeywordStorage();

  const isEmptyRecentSearches = keywords.length === 0;

  const handleMoveSearchResult = (keyword: string) => {
    setValue('searchKeyword', keyword);

    void router.push(PAGE_PATH.search.keyword(keyword));
  };

  return (
    <Container>
      <TitleContainer>
        <Title>최근 검색어</Title>
        {!isEmptyRecentSearches && (
          <DeleteAllButton type="button" onClick={handleDeleteAllSearchKeyword}>
            전체 삭제
          </DeleteAllButton>
        )}
      </TitleContainer>
      {isEmptyRecentSearches ? (
        <NoSearchResults description="최근 검색어 내역이 없습니다." />
      ) : (
        <RecentSearchList>
          {keywords.map((recentSearchKeyword) => {
            return (
              <RecentSearchItem key={recentSearchKeyword}>
                <button
                  type="button"
                  onClick={() => {
                    handleMoveSearchResult(recentSearchKeyword);
                  }}
                >
                  {recentSearchKeyword}
                </button>
                <DeleteButton
                  type="button"
                  onClick={() => {
                    handleDeleteSearchKeyword(recentSearchKeyword);
                  }}
                >
                  <CloseIcon
                    width={16}
                    height={16}
                    stroke={theme.colors.gray_04}
                  />
                </DeleteButton>
              </RecentSearchItem>
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
  align-items: flex-start;
  gap: 10px;
  padding-top: 18px;
`;

const RecentSearchItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.bg_01};
  ${({ theme }) => theme.fonts.body_05}
`;

const DeleteButton = styled.button`
  ${SVGVerticalAlignStyle}
`;
