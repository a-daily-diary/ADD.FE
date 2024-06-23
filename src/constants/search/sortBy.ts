export const SORT_BY_ID = {
  latest: 'latest',
  popularity: 'popularity',
  comments: 'comments',
} as const;

export const INITIAL_SORT_BY_LIST = [
  {
    id: SORT_BY_ID.latest,
    title: '최신순',
    selected: true,
  },
  {
    id: SORT_BY_ID.popularity,
    title: '인기순',
    selected: false,
  },
  {
    id: SORT_BY_ID.comments,
    title: '댓글순',
    selected: false,
  },
] as const;
