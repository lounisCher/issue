"use client"
import { AlertDialog, Button, Flex } from "@radix-ui/themes"

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
        <Button color="red" m={"3"}>Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>
                Confirm Deletion
            </AlertDialog.Title>
            <AlertDialog.Description>
                Are you sure you want to delete this issue,
                this action can not be undone
            </AlertDialog.Description>
            <Flex mt={"4"} gap={"3"}>
                <AlertDialog.Cancel>
                    <Button color="gray" variant="soft">
                        Cancel
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                <Button color="red" variant="soft">
                        Delete Issue
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton
