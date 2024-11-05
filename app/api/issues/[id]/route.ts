import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request:NextRequest, {params}: {params: Promise<{ id: string }>}){
    const {id} = await params;
    if(!id) return NextResponse.json({error: "invalid id"});
    const body = await request.json();
    if(!body) return NextResponse.json({error:"No Data"})
    const validation = issueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400});
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    });
    if(!issue)
        return NextResponse.json({error:"invalid issue"}, {status:404})
    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data:{
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(updatedIssue);

}