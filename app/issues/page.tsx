import React from 'react'
import IssuesTable from './IssuesTable';
import IssueActions from './IssueActions';


const IssuesPage = async () => {

  return (
    <div className="p-5">
      <IssueActions />
      <div className="">
        <IssuesTable />
      </div>
    </div>
  );
}

export default IssuesPage
