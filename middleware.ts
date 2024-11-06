
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './app/auth';

export const config = {
  matcher: ['/issues/new', '/issues/:id+/edit'], 
};


export async function middleware(request: NextRequest) {
   

  const isAuthenticated = await auth()
  if (!isAuthenticated) {
    
    const loginUrl = new URL('/api/auth/signin', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
