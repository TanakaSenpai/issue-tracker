import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import Link from "../../components/Link";
import { Pagination } from "@/app/components";

interface Props {
  statusParam: Status;
  orderByParam: keyof Issue;
  page: number;
}

const IssuesTable = async ({ statusParam, orderByParam, page }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    {
      label: "Issue",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Create At",
      value: "created_at",
      className: "hidden md:table-cell",
    },
  ];
  const statuses = Object.values(Status);
  const status = statuses.includes(statusParam) ? statusParam : undefined;
  const where = { status };
  const orderBy = columns.map((column) => column.value).includes(orderByParam)
    ? { [orderByParam]: "asc" }
    : undefined;
  page = page || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });
  const issueCount = await prisma.issue.count({ where });
  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Flex align="center" gap="1">
                  <NextLink href={{ query: { status, orderBy: column.value } }}>
                    {column.label}
                  </NextLink>
                  {column.value === orderByParam && <ArrowUpIcon />}
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="md:hidden text-zinc-500 text-xs">
                  {issue.status}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.created_at.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
    </div>
  );
};

export default IssuesTable;
