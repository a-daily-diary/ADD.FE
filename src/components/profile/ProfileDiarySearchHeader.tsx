import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DeleteIcon, SearchIcon } from 'assets/icons';
import { Z_INDEX } from 'constants/styles';
import { useDebounce } from 'hooks/common';
import { useSearchKeyword } from 'hooks/common/useSearchKeyword';
import { SVGVerticalAlignStyle, theme } from 'styles';

export const ProfileDiarySearchHeader = () => {
  const {
    searchKeyword,
    onChange: onChangeSearchKeyword,
    onRemove: onRemoveSearchKeyword,
  } = useSearchKeyword();

  const methods = useForm<{ search: string }>({
    defaultValues: { search: searchKeyword },
  });
  const { register, handleSubmit, setValue, setFocus } = methods;

  const handleClearSearchKeyword = () => {
    setValue('search', '');
    setFocus('search');
  };

  const onSubmit = (data: { search: string }) => {
    onChangeSearchKeyword(data.search);
  };

  const handleChangeSearchKeyword = useDebounce(handleSubmit(onSubmit));

  // FIXME: 검색 시 FullPageLoading가 잠시 마운트되는 동안 해당 컴포넌트가 언마운트되어 focus가 풀리는 이슈 임시 처리 -> Skeleton UI 적용으로 해결할 예정
  useEffect(() => {
    setFocus('search');
  }, []);

  return (
    <HeaderLayout>
      <SearchKeywordForm {...methods} onSubmit={handleSubmit(onSubmit)}>
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
          {...register('search', {
            setValueAs: (value: string) => value.trim(),
            onChange: handleChangeSearchKeyword,
          })}
        />
        <DeleteButton
          type="button"
          isVisible
          onClick={handleClearSearchKeyword}
        >
          <DeleteIcon />
        </DeleteButton>
      </SearchKeywordForm>
      <CancelButton type="button" onClick={onRemoveSearchKeyword}>
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
