"use client";

import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

type SettingsFormProps = {
  initialData: Store;
};

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

function SettingsForm({ initialData }: SettingsFormProps) {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const isLoading = form.formState.isSubmitting;
  const [open, setOpen] = useState(false);
  const { storeId } = useParams();
  const router = useRouter();

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      await axios.patch(`/api/stores/${storeId}`, data);
      router.refresh();
      toast.success("Store updated.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const onDelete = async () => {
    try {
      // TODO: Pending to implement the functionality
    } catch (err) {
      toast.error("Make sure you removed all products and categories first.");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        loading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
}

export default SettingsForm;
