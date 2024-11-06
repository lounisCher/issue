"use client"
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const IssueStatusFilter = () => {
    const router = useRouter()
    const statuses: {label:string, value?:Status}[]=[
        {label:"All"},
        {label:'Open', value:"OPEN"},
        {label:'In Progress', value:"IN_PROGRESS"},
        {label:'Closed', value:"CLOSED"}
    ]
  return (
    <Select.Root onValueChange={(status)=>{
        //the same technique used in the page file but with object()
        const validStatuses = ["OPEN", "IN_PROGRESS", "CLOSED"]; 
        const query = validStatuses.includes(status) ? `?status=${status}` : "";
        router.push("/issues"+query);
    }}>
        <Select.Trigger placeholder='Filter by status'/>
        <Select.Content>
            {statuses.map(status=>(
                <Select.Item key={status.label} value={status.value || "All"}>
                    {status.label}
                </Select.Item>
            ))}
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter