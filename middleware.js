import { NextResponse } from 'next/server';

export function middleware(request) {
    const authenticated = request.cookies.get('authenticated');
    const { pathname } = request.nextUrl;

    // If an authenticated user tries to access the login page, redirect them to the home page.
    if (pathname.startsWith('/login') && authenticated?.value === 'true') {
        const url = new URL('/', request.url);
        return NextResponse.redirect(url);
    }

    // Protect these routes.
    if (pathname.startsWith('/form-view') || pathname.startsWith('/find-receipt')) {
        if (authenticated?.value !== 'true') {
            const url = new URL('/login', request.url);
            
            // --- ADDED: Pass the original path to the login page as a 'redirect' query parameter ---
            url.searchParams.set('redirect', pathname);
            // --- END ADDED ---
            
            return NextResponse.redirect(url);
        }
    }

    // Allow the request to continue.
    return NextResponse.next();
}

// Specify which routes the middleware should run on.
export const config = {
    matcher: ['/login', '/form-view', '/find-receipt'],
};