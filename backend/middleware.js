import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.method === 'OPTIONS') {
    return new NextResponse('OK', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
