import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { DeleteIcon, SearchIcon } from 'assets/icons';
import { Z_INDEX } from 'constants/styles';
import { useDebounce } from 'hooks/common';
import { SVGVerticalAlignStyle, theme } from 'styles';

interface ProfileDiarySearchHeaderProps {
  from: string;
  to: (path: string) => string;
  initialValue?: string | null;
}

export const ProfileDiarySearchHeader = ({
  from,
  to,
  initialValue,
}: ProfileDiarySearchHeaderProps) => {
  const router = useRouter();

  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleClearSearchKeyword = () => {
    const searchElement = searchRef.current;
    if (!searchElement) return;

    searchElement.value = '';
    searchElement.focus();
  };

  const handleCancel = () => {
    void router.push(from);
  };

  const submitSearch = () => {
    const searchKeyword = searchRef.current?.value;
    if (searchKeyword === undefined) return;

    void router.push(to(searchKeyword), undefined, { shallow: true });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch();
  };

  useEffect(() => {
    searchRef.current?.focus();

    if (initialValue && searchRef.current) {
      searchRef.current.value = initialValue;
    }
  }, []);

  return (
    <HeaderLayout>
      <SearchKeywordForm onSubmit={handleSubmit}>
        <SearchLabel htmlFor="searchKeyword">
          <button type="submit">
            <SearchIcon
              width={20}
              height={20}
              stroke={theme.colors.primary_00}
            />
          </button>
        </SearchLabel>
        <SearchInput
          type="search"
          id="searchKeyword"
          placeholder="검색어를 입력하세요."
          ref={searchRef}
          onChange={useDebounce(submitSearch)}
        />
        <DeleteButton
          type="button"
          isVisible
          onClick={handleClearSearchKeyword}
        >
          <DeleteIcon />
        </DeleteButton>
      </SearchKeywordForm>
      <CancelButton type="button" onClick={handleCancel}>
        취소
      </CancelButton>
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
  z-index: ${Z_INDEX.header};
  height: 54px;
  padding: 0 20px;
  background: ${({ theme }) => theme.colors.white};
`;

const SearchKeywordForm = styled.form`
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

  ${SVGVerticalAlignStyle}
`;

const CancelButton = styled.button`
  ${({ theme }) => theme.fonts.body_05}
`;
