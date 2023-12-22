import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
  return (
    <Flex className='mb-5' justify="between">
      <IssueStatusFilter />
      <div>
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
    </Flex>
  );
}

export default IssueActions
