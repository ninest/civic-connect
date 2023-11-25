"use client";

import { addCategoryAction, deleteCategoryAction, editCategoryAction } from "@/app/_actions/category-actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditCategoryFormType, editCategoryFormSchema } from "@/services/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CreateProps {
  type: "create";
  botId: string;
}
interface EditProps {
  type: "edit";
  categoryId: string;
  deleteRedirectHref: string;
  defaultValues?: Partial<EditCategoryFormType>;
}

type Props = CreateProps | EditProps;

export function BotCategoryForm(props: Props) {
  // const editing = !!categoryId && !botId;
  const editing = props.type === "edit";

  const form = useForm<EditCategoryFormType>({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: editing
      ? props.defaultValues
      : {
          name: "",
          description: "",
        },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (editing) await editCategoryAction(props.categoryId, data);
    else {
      await addCategoryAction(props.botId, data);
    }
  });

  const onDelete = async () => {
    if (editing) {
      await deleteCategoryAction(props.categoryId);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Button>Save</Button>
            {editing && (
              <Button type="button" onClick={onDelete} variant={"secondary"} size={"sm"}>
                Delete
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
