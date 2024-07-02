import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token'); 

    const publicPaths = [
        '/login', 
        '/signup', 
        '/resetpassword', 
        '/_next/', 
        '/static/', 
        '/public/', 
        '/images/'
    ];

    if (!token) {
        if (!publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
            return NextResponse.redirect(new URL('/login', req.url)); 
        }
    }

    return NextResponse.next(); 
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|static|public|images|login|signup|resetpassword|favicon.ico).*)',
    ],
};
