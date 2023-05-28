import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret, raw: true });
  const { pathname } = request.nextUrl;

  // 로그인 상태에서 로그인, 회원가입 페이지 접근 시 메인 페이지로 리다이렉트
  if (session != null) {
    if (pathname.startsWith('/account')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

// matcher에 포함된 특정 경로에서만 middleware 실행
export const config = {
  matcher: ['/account/:path*'],
};
