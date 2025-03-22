import { useRouter } from 'next/router';
import { PAGE_QUERY_PARAM } from 'constants/common';
import { getQueryParams } from 'utils';

export const useSearchKeyword = () => {
  const { query, asPath, push } = useRouter();

  const onChange = (searchKeyword: string) => {
    const pathname = asPath.split('?')[0];
    void push(
      {
        pathname,
        query: {
          [PAGE_QUERY_PARAM.searchKeyword]: searchKeyword,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const onRemove = () => {
    const pathname = asPath.split('?')[0];
    void push(pathname, undefined, { shallow: true });
  };

  return {
    searchKeyword:
      getQueryParams(query[PAGE_QUERY_PARAM.searchKeyword])[0] ?? '',
    isSearchMode: Object.keys(query).includes(PAGE_QUERY_PARAM.searchKeyword),
    onChange,
    onRemove,
  };
};
