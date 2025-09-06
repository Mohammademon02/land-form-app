import { NextResponse } from 'next/server';

export function middleware(request) {
    const authenticated = request.cookies.get('authenticated');
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/login') && authenticated?.value === 'true') {
        const url = new URL('/', request.url);
        return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/form-view') || pathname.startsWith('/find-receipt')) {
        if (authenticated?.value !== 'true') {
            const url = new URL('/login', request.url);
            return NextResponse.redirect(url);
        }
    }

    // Allow the request to continue
    return NextResponse.next();
}

// Specify which routes the middleware should run on
export const config = {
    matcher: ['/login', '/form-view', '/find-receipt'],
};

