import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssuesTable, { columnNames } from "./IssuesTable";
import { Pagination } from "@/app/components";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: {status: Status, orderBy: keyof Issue, page: string}
}

const IssuesPage = async ({ searchParams }: Props) => {
const statuses = Object.values(Status);
const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
const where = { status };
const orderBy = columnNames.includes(searchParams.orderBy)
  ? { [searchParams.orderBy ]: "asc" }
  : undefined;
  const page = parseInt(searchParams.page) || 1;
  const issueCount = await prisma.issue.count({ where });
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <Flex direction="column" gap="3" className="p-5">
      <IssueActions />
      <IssuesTable
        status={searchParams.status}
        orderByParam={searchParams.orderBy}
        issues={issues}
      />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export default IssuesPage;
