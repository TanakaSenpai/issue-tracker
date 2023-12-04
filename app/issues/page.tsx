import React from 'react'
import { Button, Table } from "@radix-ui/themes";
import Link from 'next/link';
import IssuesTable from './IssuesTable';


const IssuesPage = async () => {

  return (
    <div className="p-5">
      <div className='mb-5'>
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
      <div className="">
        <IssuesTable />
      </div>
    </div>
  );
}

export default IssuesPage
