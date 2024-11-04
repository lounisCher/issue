"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

const SimpleMde = dynamic(()=> import('react-simplemde-editor'), {ssr: false});

type IssueFormData = z.infer<typeof issueSchema>;

interface Props{
  issue?:Issue
}

const IssueForm = ({issue}: Props) => {
  const { push } = useRouter();
  const [Submiting, setSubmiting]=useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmiting(true)
            await axios.post("/api/issues", data);
            push("/issues");
          } catch (error) {
            setSubmiting(false)
            setError("An unexpected error is occured");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} 
        defaultValue={issue?.title}
        />
        
          <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>
   
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMde placeholder="Description" {...field} />
          )}
        />
        
          <ErrorMessage>
            {errors.description?.message}
          </ErrorMessage>

        <Button disabled={Submiting}>
          Submit new issues{Submiting &&<Spinner/>}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
