import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssuesButton from "./EditIssuesButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { auth } from "@/app/auth";
import AssigneeSelect from "./AssigneeSelect";



const IssueDetailPage = async ({params}: {params: Promise<{ id: string }>}) => {

  const session = await auth();
  


  const idIssue = (await params).id;
  if (!idIssue) notFound();
  const id = parseInt(idIssue, 10);
  if (isNaN(id)) return notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });
  if(!issue) return notFound();
  return (
    <Grid columns={{initial: "1", sm:"5"}}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue}/>
      </Box>
      {session && <Box>
        <Flex direction="column">
        <AssigneeSelect issue={issue}/>  
        <EditIssuesButton issueId={issue.id}/>
        <DeleteIssueButton issueId={issue.id}/>
        </Flex>
      </Box>}
    </Grid>
  );
};

export default IssueDetailPage;
