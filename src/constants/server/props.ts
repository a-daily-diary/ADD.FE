import { PAGE_PATH } from 'constants/common';

export const SERVER_SIDE_PROPS = {
  REDIRECT_LOGIN: {
    redirect: {
      destination: PAGE_PATH.account.login,
      permanent: false,
    },
  },
};
