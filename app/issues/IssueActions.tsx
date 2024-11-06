import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActions = () => {
  return (
    <Flex justify={"between"} mb={"5"}>
        <Button>
          <Link href="/issues/new">New Issues</Link>
        </Button>
        <IssueStatusFilter/>
      </Flex>
  )
}

export default IssueActions
