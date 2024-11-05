import { Button } from "@radix-ui/themes"

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  return (
    <Button color="red" m={"3"}>Delete Issue</Button>
  )
}

export default DeleteIssueButton
