import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { PAGE_PATH, WITH_AUTH_PAGE_LIST } from 'constants/common';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await getToken({ req: request, secret, raw: true });
  const isLoggedIn = session != null;

  if (isLoggedIn) {
    // NOTE: 로그인 상태에서 비밀번호 재설정 페이지 접근 가능
    if (pathname.startsWith(PAGE_PATH.account.resetPassword)) return;

    // NOTE: 로그인 상태에서 로그인, 회원가입 페이지 접근 불가
    if (pathname.startsWith(PAGE_PATH.account.index)) {
      return NextResponse.redirect(new URL(PAGE_PATH.main, request.url));
    }
  }

  if (!isLoggedIn) {
    // NOTE: 비로그인 상태에서 WITH_AUTH_PAGE_LIST 접근 불가
    if (WITH_AUTH_PAGE_LIST.includes(pathname)) {
      return NextResponse.redirect(
        new URL(PAGE_PATH.account.login, request.url),
      );
    }
  }
}

// NOTE: page route에서만 middleware 실행
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
