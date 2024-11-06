import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Pagination from "../_components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames } from "./IssueTable";

type SearchParams = Promise<{
  status: Status;
  orderBy: keyof Issue;
  page: string;
}>;

const IssuesPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where: { status } });

  if (!issues) return notFound();
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
         <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
     </Flex>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 10;
export default IssuesPage;
