import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssuesButton from "./EditIssuesButton";
import IssueDetails from "./IssueDetails";


const IssueDetailPage = async ({params}: {params: Promise<{ id: string }>}) => {
  const {id} = await params;
  if (!id) notFound();  
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if(!issue) return notFound();
  return (
    <Grid columns={{initial: "1", md:"2"}}>
      <Box>
        <IssueDetails issue={issue}/>
      </Box>
      <Box>
        <EditIssuesButton issueId={issue.id}/>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
