import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {

const token = request.cookies.get("sb-access-token")

const protectedRoutes = [
"/dashboard",
"/products",
"/sales",
"/stores",
"/inventory"
]

const isProtected = protectedRoutes.some((route)=>
request.nextUrl.pathname.startsWith(route)
)

if(isProtected && !token){

return NextResponse.redirect(new URL("/login", request.url))

}

return NextResponse.next()

}                                                                           