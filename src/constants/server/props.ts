import { PAGE_PATH } from 'constants/common';

export const REDIRECT_LOGIN_PAGE_PROPS = {
  redirect: {
    destination: PAGE_PATH.account.login,
    permanent: false,
  },
};
