import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

import { issueSchema } from "../../validationSchemas";
import { auth } from "@/app/auth";

export async function POST(request: NextRequest){

    const session= await auth();
    if(!session) return NextResponse.json({}, {status:401});
    const body = await request.json();
    if(!body) return NextResponse.json({error: "No Data"});
    const validation = issueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400});

    const newIssue = await prisma.issue.create({
        data:{title: body.title, description: body.description, status:body.status}
    });
    if(!newIssue) return NextResponse.json({error:"Unexpected Error occured"});
    return NextResponse.json(newIssue);


}