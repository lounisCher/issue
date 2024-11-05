import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssuesButton from "./EditIssuesButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";


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
    <Grid columns={{initial: "1", sm:"5"}}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue}/>
      </Box>
      <Box>
        <Flex direction="column">
        <EditIssuesButton issueId={issue.id}/>
        <DeleteIssueButton issueId={issue.id}/>
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
