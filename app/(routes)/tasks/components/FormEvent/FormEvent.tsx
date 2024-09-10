"use client"



import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";


import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from "@/components/ui/button";
import {Select,SelectContent,SelectItem,SelectTrigger, SelectValue } from '@/components/ui/select'


import { FormEventProps } from "./FormEvent.types";
import { FormEventSchema, defaultValues, formEventSchema } from "./FormEvent.form";


const FormEvent = ({
  companies,
  setNewEvent,
  setOnSaveNewEvent,
  setOpen,
}: FormEventProps) => {
  const [selectedCompany, setSelectedCompany] = useState({
    name: "",
    id: ""
  });

  const form = useForm<FormEventSchema>({
    resolver: zodResolver(formEventSchema),
    defaultValues
  });

  const onSubmit: SubmitHandler<FormEventSchema> = (values) => {
    setNewEvent(values);
    setOpen(false);
    setOnSaveNewEvent(true);
  }

  const handleCompanyChange = (newValue: string) => { 
    const selectedCompany = companies.find(company => company.name === newValue);
    if (selectedCompany) {
      setSelectedCompany({
        name: selectedCompany.name,
        id: selectedCompany.id
      })
      form.setValue('companieSelected.name', selectedCompany.name);
      form.setValue('companieSelected.id', selectedCompany.id);
    }
  }

  return <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <FormField
        control={form.control}
        name="eventName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Meeting..." {...field} />
            </FormControl>
            <FormDescription>This is your event name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="companieSelected.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company name</FormLabel>
            <Select onValueChange={(newValue) => {
              field.onChange(newValue)
              handleCompanyChange(newValue);
            }} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a company"/>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id}
                    value={company.name}>
                    {company.name}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Create event</Button>
    </form>
  </Form>;
};

export default FormEvent;
