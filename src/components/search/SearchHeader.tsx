import styled from '@emotion/styled';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';
import type { SearchForm } from 'types/search';
import { DeleteIcon, SearchIcon } from 'assets/icons';
import { PAGE_PATH } from 'constants/common';
import { SVGVerticalAlignStyle, theme } from 'styles';

export const SearchHeader = () => {
  const { register, watch } = useFormContext<SearchForm>();
  const { searchKeyword } = watch();

  const handleChangeSearch = () => {
    // TODO: 검색 기능 구현
    console.log(searchKeyword);
  };

  return (
    <HeaderLayout>
      <SearchContainer>
        <SearchLabel htmlFor="searchKeyword">
          <SearchIcon width={20} height={20} stroke={theme.colors.primary_00} />
        </SearchLabel>
        <SearchInput
          {...register('searchKeyword', {
            required: true,
            onChange: handleChangeSearch,
          })}
          type="search"
          id="searchKeyword"
          placeholder="검색어를 입력하세요."
        />
        <DeleteButton type="button" isVisible={searchKeyword?.length > 0}>
          <DeleteIcon />
        </DeleteButton>
      </SearchContainer>
      <CancelLink href={PAGE_PATH.main}>취소</CancelLink>
    </HeaderLayout>
  );
};

const HeaderLayout = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  height: 54px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_06};
  background: ${({ theme }) => theme.colors.white};
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 40px;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.bg_02};
`;

const SearchLabel = styled.label`
  ${SVGVerticalAlignStyle}
`;

const SearchInput = styled.input`
  flex: 1;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body_05}

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_02};
  }

  &:focus {
    outline: 0;
  }
`;

const DeleteButton = styled.button<{ isVisible: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const CancelLink = styled(Link)`
  ${({ theme }) => theme.fonts.body_05}
`;
