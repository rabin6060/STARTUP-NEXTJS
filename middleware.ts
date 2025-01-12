import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

//middleware to access provided routes if only user is logged in!!
export async function middleware(req:NextRequest){
    const session = await auth()

    if (!session?.id) {
        const response = NextResponse.redirect(new URL('/',req.url))
        response.cookies.set('unauthorize','true',{path:'/'})
        return response
    }

    return NextResponse.next()
}

export const config = {
    matcher :[ '/startup/:id','/user/:id']
}