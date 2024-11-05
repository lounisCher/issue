import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request:NextRequest, {params}: {params: Promise<{ id: string }>}){
    const idIssue = (await params).id;
    const id = parseInt(idIssue, 10);    
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400});
    const issue = await prisma.issue.findUnique({
        where: {id: id}
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

export async function DELETE(request:NextRequest, {params}:{params:  Promise<{ id: string }>}){
    const idIssue = (await params).id;
    const id = parseInt(idIssue, 10);   
    const toDeleteIssue = await prisma.issue.findUnique({
        where:{id: id}
    });
    if(!toDeleteIssue) return NextResponse.json({error: 'Invalid Issue'}, {status:404});
    await prisma.issue.delete({
        where:{id: id}
    });
    return NextResponse.json({});

}