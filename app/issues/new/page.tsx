"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createIssueSchema } from "@/app/validationSchema";

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssue = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  return (
    <div className="max-w-2xl">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error has occured");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="title" {...register("title")} />
        </TextField.Root>
        {errors.title && <Text color="red">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field} />
          )}
        />
        {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
        <Button>Submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssue;
