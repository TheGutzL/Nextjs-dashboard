"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { toast, useToast } from "@/hooks/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import {
  companyFormSchema,
  CompanyFormSchema,
  defaultValues,
} from "./CompanyForm.form";
import { CompanyFormProps } from "./CompanyForm.types";
import { Button } from "@/components/ui/button";
import axios from "axios";

const CompanyForm = ({ company }: CompanyFormProps) => {
  const router = useRouter();
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const { toast } = useToast();

  const form = useForm<CompanyFormSchema>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      ...defaultValues,
      ...company,
    },
  });

  const onSubmit: SubmitHandler<CompanyFormSchema> = async (values) => {
    try {
      await axios.patch(`/api/company/${company.id}`, values)
      toast({
        title: "Company updated",
      })
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive"
      })
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Company name..."
                    type="text"
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
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="spain">España</SelectItem>
                    <SelectItem value="united-kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="portugal">Portugal</SelectItem>
                    <SelectItem value="grecia">Grecia</SelectItem>
                    <SelectItem value="italia">Italia</SelectItem>
                  </SelectContent>
                </Select>
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
                    placeholder="www.gutzdev.com"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                    placeholder="+51 651 121 212"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIF / NIF</FormLabel>
                <FormControl>
                  <Input
                    placeholder="B-1234567"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  <div>
                    {photoUploaded ? (
                      <p className="text-sm">Image uploaded</p>
                    ) : (
                      <UploadButton
                        className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-2"
                        {...field}
                        endpoint="profileImage"
                        onClientUploadComplete={(res) => {
                          form.setValue("profileImage", res?.[0].url);
                          setPhotoUploaded(true);
                        }}
                        onUploadError={(error: Error) => {
                          toast({ title: "Error uploading photo" });
                        }}
                      />
                    )}
                  </div>
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
                <FormLabel>Company description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description..."
                    {...field}
                    value={form.getValues().description ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Edit Company</Button>
      </form>
    </Form>
  );
};

export default CompanyForm;
