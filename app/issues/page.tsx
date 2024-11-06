import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssuesStatusBadge from "../_components/IssuesStatusBadge";
import LinkComp from "../_components/Link";
import IssueActions from "./IssueActions";
import { notFound } from "next/navigation";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";


type SearchParams = Promise<{
  status: Status;
  orderBy: keyof Issue;
}>;


const IssuesPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;


  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;


  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
  });

  if (!issues) return notFound();
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <LinkComp href={`/issues/${issue.id}`}>{issue.title}</LinkComp>
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

export const dynamic = "force-dynamic";
// export const revalidate = 10;
export default IssuesPage;
