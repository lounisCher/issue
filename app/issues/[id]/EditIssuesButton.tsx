import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const EditIssuesButton = ({issueId}:{issueId:number}) => {
  if(!issueId) notFound();

  return (
    <Button m={"3"}>
          <Pencil2Icon/>
          <Link href={`/issues/${issueId}/edit`}>
          Edit issue
          </Link>        
    </Button>
  )

}

export default EditIssuesButton
