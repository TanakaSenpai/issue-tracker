import IssueActions from "./IssueActions";
import IssuesTable from "./IssuesTable";

const IssuesPage = async () => {
  return (
    <div className="p-5">
      <IssueActions />
      <div className="">
        <IssuesTable />
      </div>
    </div>
  );
};

export default IssuesPage;
