import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// export async function middleware(req) {
//     const token = await getToken({ req, secret: process.env.JWT_SECRET })

//     const { pathname } = req.nextUrl

//     if (pathname === '/login') {
//         console.log("pRAY");
//     }

//     if (pathname.includes('/api/auth') || token) {
//         return NextResponse.next();
//     }

//     if (!token && pathname !== '/login') {
//         const urlthing = new URL('/login', req.url);
//         return NextResponse.redirect(new URL('/login', req.url));
//     }
// }
export function middleware(req) {
    // const pathname = req.nextUrl.pathname;
    // console.log(pathname);
    // req.nextUrl.searchParams;
    // if (pathname !== '/test' && !req.nextUrl.searchParams.has('redirected')) {
    //     console.log('Not login');
    //     return NextResponse.redirect(new URL('/test', req.url));
    // }
    // const pathname = req.nextUrl.pathname;
    // if (pathname != '/login' && pathname != ) {
    //     console.log(pathname);
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }
    const pathname = req.nextUrl.pathname;
    if (pathname != '/login' && pathname != '/_next/static/chunks/webpack.js' && pathname != '/_next/static/chunks/main.js' && pathname != '/_next/static/chunks/react-refresh.js' && pathname != '/_next/static/chunks/pages/_app.js' && pathname != '/_next/static/development/_buildManifest.js' && pathname != '/_next/static/chunks/pages/login.js') {
        console.log(pathname);
        return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
}

