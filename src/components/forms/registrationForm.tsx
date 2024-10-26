"use client";
import { RegistrationFromSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CustomField } from "../customField";
import { FormFieldType } from "@/lib/constants";
import { Mail, UserRound } from "lucide-react";

export const RegistrationForm = () => {
  const form = useForm<z.infer<typeof RegistrationFromSchema>>({
    resolver: zodResolver(RegistrationFromSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegistrationFromSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[15px] mt-[30px]"
      >
        <CustomField
          name="fullName"
          label="Full name"
          formControl={form.control}
          placeHolder="John Doe"
          icon={<UserRound />}
          fieldType={FormFieldType.INPUT}
        />

        <CustomField
          name="email"
          label="Email"
          formControl={form.control}
          placeHolder="johndoe@gmail.com"
          icon={<Mail />}
          fieldType={FormFieldType.INPUT}
        />

        <CustomField
          name="phoneNumber"
          label="Phone Number"
          formControl={form.control}
          placeHolder="08101330834"
          fieldType={FormFieldType.PHONE_INPUT}
        />

        <Button
          type="submit"
          className="bg-green-500 w-full hover:bg-green-500 hover:opacity-[0.9] mt-[20px] text-white"
        >
          Get started
        </Button>
      </form>
    </Form>
  );
};
