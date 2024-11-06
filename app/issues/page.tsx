import prisma from "@/prisma/client";
import {  Table } from "@radix-ui/themes";
import IssuesStatusBadge from "../_components/IssuesStatusBadge";
import Link from "../_components/Link";
import IssueActions from "./IssueActions";
import { notFound } from "next/navigation";
import { Status } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: Status }>

const IssuesPage = async (props: {
  searchParams: SearchParams
}) => {
  const searchParams = await props.searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)?searchParams.status:undefined;
  const issues = await prisma.issue.findMany({
    where:{
      status: status
    }
  });

  if(!issues) return notFound();
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden flex-col space-y-2">
                  <IssuesStatusBadge status={issue.status} />
                  <p className="text-slate-500">
                    {issue.createdAt.toDateString()}
                  </p>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssuesStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';
// export const revalidate = 10;
export default IssuesPage;
