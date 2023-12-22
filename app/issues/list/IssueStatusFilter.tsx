'use client'

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const statuses: { label: String, value?: Status }[] = [
        { label: "All" },
        { label: "Open", value: Status.OPEN },
        { label: "In Progress", value: Status.IN_PROGRESS },
        { label: "Closed", value: Status.CLOSED },
    ]

  return (
      <Select.Root
          defaultValue={searchParams.get("status") || ""}
          onValueChange={(status) => {
          const params = new URLSearchParams();
          if (status) params.append('status', status);
          if (searchParams.get("orderBy"))
              params.append('orderBy', searchParams.get("orderBy")!);
          
        const query = params.size ? "?" + params.toString(): "";
        router.push("/issues/list" + query);
    }}>
          <Select.Trigger placeholder="Filter by status..." />
          <Select.Content>
              {statuses.map(status => (
                  <Select.Item key={status.value} value={status.value || "ALL"}>
                      {status.label}
                  </Select.Item>
              ))}
          </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
