"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormCreateCustomerProps } from "./FormCreateCustomer.types";
import { formDefaultValues, formSchema, FormSchema } from "./types/schema";
import { useRouter } from "next/navigation";

const FormCreateCustomer = ({
  setOpenModalCreate,
}: FormCreateCustomerProps) => {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const { isValid } = form.formState;

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    try {
      axios.post("/api/company", values);
      toast({ title: "Company Created" });
      router.refresh()
      setOpenModalCreate(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Company name..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="united-kingdom">
                        United Kingdom
                      </SelectItem>
                      <SelectItem value="spain">España</SelectItem>
                      <SelectItem value="portugal">Portugal</SelectItem>
                      <SelectItem value="grecia">Grecia</SelectItem>
                      <SelectItem value="italia">Italia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the country of the company
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="https://nextjs-portfolio-website-oebr436qz-joelunas-projects.vercel.app"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="+51 999 999 999"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cif"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CIF</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="B-1234567"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    {photoUploaded ? (
                      <p className="text-sm">Image Uploaded</p>
                    ) : (
                      <UploadButton
                        className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-2"
                        {...field}
                        endpoint="profileImage"
                        onClientUploadComplete={(res) => {
                          form.setValue("profileImage", res?.[0].url);
                          toast({
                            title: "Photo uploaded successfully",
                          });
                          setPhotoUploaded(true);
                        }}
                        onUploadError={(error: Error) => {
                          toast({
                            title: "Error uploading photo",
                          });
                        }}
                      />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="mt-2"
            disabled={!isValid}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormCreateCustomer;
