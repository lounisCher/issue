import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssuesButton from "./EditIssuesButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { auth } from "@/app/auth";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";


const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await auth();

  const idIssue = (await params).id;
  if (!idIssue) notFound();
  const id = parseInt(idIssue, 10);
  if (isNaN(id)) return notFound();

  const issue = await fetchUser(id);
  if (!issue) return notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className="mt-2 lg:m-0">
          <AssigneeSelect issue={issue} />
          <Flex direction="column">
            <EditIssuesButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetada({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const idIssue = (await params).id;
  const id = parseInt(idIssue, 10);
  const issue = await fetchUser(id);
  return {
    title: issue?.title,
    Description: "Details of issue" + issue?.id,
  };
}

export default IssueDetailPage;
