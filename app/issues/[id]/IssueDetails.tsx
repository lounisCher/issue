import IssuesStatusBadge from '@/app/components/IssuesStatusBadge'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({issue}:{issue:Issue}) => {

  return (
    <>
    <Heading>{issue.title}</Heading>
        <Flex gap={"3"} my={"2"}>
          <IssuesStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt={"3"}>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </>
  )
}

export default IssueDetails
