// export { auth as middleware } from "@/auth"
import { auth, signOut } from "@/auth"

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = await auth()

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/admin/:path*',
}