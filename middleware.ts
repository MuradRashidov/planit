import { clerkMiddleware, createRouteMatcher, currentUser, auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/','/api/webhook'])

export default clerkMiddleware(async (auth, request) => {
  const { userId, orgId } = await auth();

    const pathname = request.nextUrl.pathname;
    //console.log(`Pathname: ${pathname} url: ${request.url}, user: ${request.user}`);
    
    console.log('orgId:',orgId," sdss", userId);
    
    // const { orgId, userId } = await auth();
    // const user  =  currentUser();

    if (userId && isPublicRoute(request)) {
      let path = '/select-org'
      if(orgId){        
        path = `/organization/:${orgId}`
        console.log(`Path: ${path} request url: ${request.url}`);
        
        const orgSelection = new URL(path,request.url)
        return NextResponse.redirect(orgSelection)
      }
      
      
      
    }
  if (!isPublicRoute(request)) {
    await auth.protect()
    if (!userId) {
      return NextResponse.redirect(request.url)
   }
   
  }
  if (userId && !orgId && request.nextUrl.pathname !== '/select-org' && request.nextUrl.pathname !== '/api/webhook') {
    console.log(`url: ${request.url} nextUrl: ${request.nextUrl}`);
    const orgSelection = new URL('/select-org',request.url);    
    return NextResponse.redirect(orgSelection);
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}