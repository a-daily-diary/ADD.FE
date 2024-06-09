import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { ChangeEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { SearchForm } from 'types/search';
import { DeleteIcon, SearchIcon } from 'assets/icons';
import { PAGE_PATH } from 'constants/common';
import { Z_INDEX } from 'constants/styles';
import { SVGVerticalAlignStyle, theme } from 'styles';
import { debounce } from 'utils';

interface SearchHeaderProps {
  onSaveSearchKeyword: (keyword: string) => void;
}

export const SearchHeader = ({ onSaveSearchKeyword }: SearchHeaderProps) => {
  const router = useRouter();
  const {
    query: { keyword },
  } = router;

  const { register, watch, setValue, setFocus, handleSubmit } =
    useFormContext<SearchForm>();
  const { searchKeyword: watchSearchKeyword } = watch();

  const handleDeleteSearchKeyword = () => {
    setValue('searchKeyword', '');
    setFocus('searchKeyword');
  };

  const handleCancel = () => {
    if (keyword === undefined) {
      void router.push(PAGE_PATH.main);

      return;
    }

    void router.push(PAGE_PATH.search.index);
  };

  const onSubmit: SubmitHandler<SearchForm> = async (data) => {
    const { searchKeyword } = data;

    onSaveSearchKeyword(searchKeyword);

    await router.push(PAGE_PATH.search.keyword(searchKeyword));
  };

  const handleChangeSearchKeyword: ChangeEventHandler<SearchForm> = useCallback(
    debounce(handleSubmit(onSubmit)),
    [],
  );

  useEffect(() => {
    setValue('searchKeyword', keyword as string);
    setFocus('searchKeyword');
  }, []);

  return (
    <HeaderLayout>
      <SearchKeywordForm onSubmit={handleSubmit(onSubmit)}>
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
          {...register('searchKeyword', {
            required: true,
            setValueAs: (value: string) => value.trim(),
            onChange: handleChangeSearchKeyword,
          })}
          type="search"
          id="searchKeyword"
          placeholder="검색어를 입력하세요."
        />
        <DeleteButton
          type="button"
          isVisible={watchSearchKeyword?.length > 0}
          onClick={handleDeleteSearchKeyword}
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_06};
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
