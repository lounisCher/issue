import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssuesButton from "./EditIssuesButton";
import IssueDetails from "./IssueDetails";


const IssueDetailPage = async ({params}: {params: Promise<{ id: string }>}) => {
  const idIssue = (await params).id;
  if (!idIssue) notFound();
  const id = parseInt(idIssue, 10);
  if (isNaN(id)) return notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: id },
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
