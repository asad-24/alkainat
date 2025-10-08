import { type NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ar', 'ur'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Redirect to default locale (en)
    const locale = 'en';
    const newUrl = new URL(`/${locale}${pathname}`, req.url);
    return NextResponse.redirect(newUrl);
  }

  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('role')?.value;

  // Paths to protect
  const adminRoutes = ['/admin/dashboard', '/admin/settings'];
  const userRoutes = ['/user/profile', '/user/settings'];
  const authRoutes = ['/auth/signin', '/auth/signup'];

  // If no token, redirect unauthenticated users to signin page
  if (!token) {
    if (adminRoutes.includes(pathname) || userRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/en/auth/signin', req.url));
    }
  } else {
    // Prevent logged-in users from accessing auth pages
    if (authRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/en', req.url));
    }

    // Role-based access control
    if (role === 'user') {
      // User can access user routes but not admin routes
      if (adminRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/en', req.url));
      }
    } else if (role === 'admin') {
      // Admin can access admin routes but not user routes
      if (userRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/en', req.url));
      }
    } else {
      // If role is neither user nor admin, redirect to home
      return NextResponse.redirect(new URL('/en', req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to all paths except static files
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
