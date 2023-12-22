import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import Link from "../../components/Link";

interface Props {
  status: Status;
  orderByParam: keyof Issue;
  issues: Issue[];
}

const IssuesTable = async ({ status, orderByParam, issues }: Props) => {
  
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
    </div>
  );
};

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

export const columnNames = columns.map(column => column.value)

export default IssuesTable;
