import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssuesTable from "./IssuesTable";

interface Props {
  searchParams: {status: Status, orderBy: keyof Issue, page: string}
}

const IssuesPage = async ({searchParams: {status, orderBy, page}}: Props) => {
  return (
    <div className="p-5">
      <IssueActions />
      <div className="">
        <IssuesTable statusParam={status} orderByParam={orderBy} page={parseInt(page)} />
      </div>
    </div>
  );
};

export default IssuesPage;
