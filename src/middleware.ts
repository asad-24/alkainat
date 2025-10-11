import { type NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ar', 'ur'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    // Allow login page without authentication
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check admin authentication
    const adminToken = req.cookies.get('admin-token')?.value;

    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Validate admin token
    try {
      const decoded = JSON.parse(Buffer.from(adminToken, 'base64').toString());
      const loginTime = new Date(decoded.loginTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);

      // Token expired (24 hours)
      if (hoursDiff > 24) {
        const response = NextResponse.redirect(new URL('/admin/login', req.url));
        response.cookies.delete('admin-token');
        return response;
      }
    } catch (error) {
      // Invalid token
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.delete('admin-token');
      return response;
    }

    return NextResponse.next();
  }

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
