import { Box, Flex, Card } from '@radix-ui/themes'
import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewIssuesLoading = () => {
  return (
    <Box className='max-w-xl'>
    <Skeleton/>
    <Flex gap={"3"} my={"2"}>
    <Skeleton width="5rem"/>
    <Skeleton width="8rem"/>    
    </Flex>
    <Card className='prose' mt={"3"}>
    <Skeleton count={3}/>
    </Card>
    </Box>
  )
}

export default NewIssuesLoading
