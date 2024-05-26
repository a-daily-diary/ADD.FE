import styled from '@emotion/styled';
import { useState } from 'react';
import { ArrowDownIcon, CheckIcon } from 'assets/icons';
import { Popover } from 'components/common';
import { useClickOutside } from 'hooks/common';

interface SearchResultHeaderProps {
  totalCount: number;
}

interface SortOptions {
  id: string;
  title: string;
  selected: boolean;
}

const initialSortOptions = [
  {
    id: 'latest',
    title: '최신순',
    selected: true,
  },
  {
    id: 'comments',
    title: '댓글순',
    selected: false,
  },
];

export const SearchResultHeader = ({ totalCount }: SearchResultHeaderProps) => {
  const [sortOptions, setSortOptions] =
    useState<SortOptions[]>(initialSortOptions);

  const { ref, isVisible, setIsVisible } = useClickOutside();

  const handleSortSearchResult = () => {
    setIsVisible((state) => !state);
  };

  // TODO: 정렬 기능 추가
  const handleSelectSortOption = (selectedIndex: number) => () => {
    setSortOptions((prevState) => {
      return prevState.map((state, stateIndex) => ({
        ...state,
        selected: stateIndex === selectedIndex,
      }));
    });
  };

  return (
    <Container>
      <TotalCountText>{`총 ${totalCount}건`}</TotalCountText>
      <SortSearchResultButton
        ref={ref}
        type="button"
        onClick={handleSortSearchResult}
      >
        {sortOptions.find((option) => option.selected)?.title}
        <ArrowDownIcon />
      </SortSearchResultButton>
      {isVisible && (
        <Popover right={20}>
          <ul>
            {sortOptions.map((option, index) => {
              const { id, selected, title } = option;
              return (
                <li key={id}>
                  <SortOptionButton
                    type="button"
                    selected={selected}
                    onClick={handleSelectSortOption(index)}
                  >
                    {title}
                    {selected && <CheckIcon />}
                  </SortOptionButton>
                </li>
              );
            })}
          </ul>
        </Popover>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 26px 20px 6px;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body_08}
`;

const SortSearchResultButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SortOptionButton = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 140px;
  padding: 13px 16px;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.primary_00 : theme.colors.gray_01};
  ${({ theme }) => theme.fonts.button_01}
  text-align: left;
`;

const TotalCountText = styled.span`
  color: ${({ theme }) => theme.colors.gray_02};
`;
