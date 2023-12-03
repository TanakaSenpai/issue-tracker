'use client'

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios"
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form className="max-w-2xl space-y-5" onSubmit={handleSubmit((data) => {
      axios.post("/api/issues", data);
      router.push("/issues")
    })}>
      <TextField.Root>
        <TextField.Input placeholder="title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({field}) => <SimpleMDE placeholder="description" {...field} /> }
      />
      <Button>Submit new issue</Button>
    </form>
  );
};

export default NewIssue;
