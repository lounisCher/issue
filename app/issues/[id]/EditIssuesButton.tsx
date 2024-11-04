import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssuesButton = ({issueId}:{issueId:number}) => {

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
